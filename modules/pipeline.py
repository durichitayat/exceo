import numpy as np
import nltk
import os
import faiss
from sentence_transformers import SentenceTransformer
from modules.retrieval.indexing import FaissIndex
from modules.retrieval.search import FaissSearch
from modules.extraction.preprocessing import DocumentProcessing
from modules.extraction.embedding import Embedding
from modules.retrieval.reranker import Reranker
from modules.generator.question_answering import QA_Generator



class Pipeline:

    def __init__(self, api_key = None):
        self.api_key = api_key


    def _chunk_file(self, document_filename, chunking_strategy, fixed_length = 60, overlap_size = 2 ):
        
        
        #initialize the DocumentProcessing class
        dp = DocumentProcessing()
        # Read the corpus
        corpus = dp._read_text_file(document_filename)
        # Trim the corpus
        trimmed_corpus = dp.trim_white_space(corpus)
        # Split the corpus into chunks
        if chunking_strategy == "fixed_length":
            chunks = dp.fixed_length_chunking(trimmed_corpus, fixed_length = fixed_length, overlap_size = overlap_size)
        elif chunking_strategy == "sentence":
            chunks = dp.sentence_chunking(trimmed_corpus, overlap_size = overlap_size)
        else:
            print("Invalid chunking strategy")
            return None
        
        return chunks
    

    #function to create the Faiss index from a gallery of images and save the resulting data base to this class
    def _precompute( self, embeddings, metadata, index_type='brute_force', **kwargs ):

        self.vector_dimension = embeddings.shape[1]
        #initialize the Faiss index based on the index type
        if index_type == 'IVF':
            #quantizer = self.index_params.get('quantizer', faiss.IndexFlat(self.vector_dimension))
            nlist = kwargs.get('nlist', 100)  # Number of clusters
            self.faiss_index = FaissIndex( vectors = embeddings, index_type = index_type, nlist = nlist )
        elif index_type == 'IVFPQ':
            #quantizer = self.index_params.get('quantizer', faiss.IndexFlat(self.vector_dimension))
            nlist = kwargs.get('nlist', 100)
            m = kwargs.get('m', 8)  # Number of subquantizers
            bits_per_subquantizer = kwargs.get('bits_per_subquantizer', 8)
            self.faiss_index = FaissIndex( vectors = embeddings, index_type = index_type, nlist = nlist, m = m, bits_per_subquantizer = bits_per_subquantizer )
        elif index_type == 'PQ':
            m = kwargs.get('m', 8)  # Number of subquantizers
            bits_per_subquantizer = kwargs.get('bits_per_subquantizer', 8)
            self.faiss_index = FaissIndex( vectors = embeddings, index_type = index_type, m = m, bits_per_subquantizer = bits_per_subquantizer )
        elif index_type == 'HNSW':
            hnsw_m = kwargs.get('hnsw_m', 32)  # Number of neighbors in HNSW
            self.faiss_index = FaissIndex( vectors = embeddings, index_type = index_type, hnsw_m = hnsw_m )
        elif index_type == 'LSH':
            num_bits = kwargs.get('num_bits', 8)  # Number of bits for hashing
            self.faiss_index = FaissIndex( vectors = embeddings, index_type = index_type, num_bits = num_bits )
        elif index_type == 'IVFSQ':
            quantizer = kwargs.get('quantizer', faiss.IndexFlat(self.vector_dimension))
            nlist = kwargs.get('nlist', 100)
            quantization_type = kwargs.get('quantization_type', faiss.ScalarQuantizer.QT_8bit)
            self.faiss_index = FaissIndex( vectors = embeddings, index_type = index_type, quantizer = quantizer, nlist = nlist, quantization_type = quantization_type )
        elif index_type == 'BinaryIVF':
            quantizer = kwargs.get('quantizer', faiss.IndexBinaryFlat(self.vector_dimension))
            nlist = kwargs.get('nlist', 100)
            self.faiss_index = FaissIndex( vectors = embeddings, index_type = index_type, quantizer = quantizer, nlist = nlist )
        else:
            self.faiss_index = FaissIndex( vectors = embeddings, index_type = index_type )


        self.faiss_index.add_embeddings( embeddings, metadata=metadata)


    def preprocess_corpus(self, corpus_directory, chunking_strategy, fixed_length = 60, overlap_size = 2, single_file = False ):

        #initialize the embedding model
        embedding_model_name = 'all-MiniLM-L6-v2'
        embedding_model = Embedding(embedding_model_name)

        chunk_meta = {}
        chunk_list = []
        chunk_list_raw = []
        chunk_row_counter = 0
        #loop through the files in the corpus directory
        if not single_file:
            for entry in os.listdir( corpus_directory ):
                    #chunk each document in the corpus
                    chunks = self._chunk_file( corpus_directory + '/' + entry, chunking_strategy, fixed_length = fixed_length, overlap_size = overlap_size ) 
                    #add each chunk to the chunk list
                    document_chunk_counter = 0
                    for chunk in chunks:
                        chunk_list.append( embedding_model.encode(chunk) )
                        chunk_list_raw.append( chunk )
                        #collect the meta data for each chunk
                        chunk_row_counter += 1
                        document_chunk_counter += 1
                        #key is the total row in index, value is the document and chunk number per document
                        #chunk_meta[ chunk_row_counter ] = { "document": entry, "chunk": chunk ,"chunk_index": document_chunk_counter }
        else:
            chunks = self._chunk_file( corpus_directory, chunking_strategy, fixed_length = fixed_length, overlap_size = overlap_size ) 
            #add each chunk to the chunk list
            document_chunk_counter = 0
            for chunk in chunks:
                chunk_list.append( embedding_model.encode(chunk) )
                #collect the meta data for each chunk
                chunk_row_counter += 1
                document_chunk_counter += 1
                #key is the total row in index, value is the document and chunk number per document
                #chunk_meta[ chunk_row_counter ] = { "document": corpus_directory, "chunk": chunk ,"chunk_index": document_chunk_counter }
                chunk_list_raw.append( chunk )


        self._precompute( np.array( chunk_list ), chunk_list_raw, index_type='HNSW', hnsw_m=48 )

    
    #function to save the Faiss index
    def _save_embeddings( self, faiss_path = "storage/catalog/index", metadata_path = "storage/catalog/index_metadata" ):
        self.faiss_index.save( faiss_path, metadata_path )

    #function to change the Faiss index to a new index
    def _load_embeddings( self, faiss_path = "storage/catalog/index", metadata_path = "storage/catalog/index_metadata" ):
        self.faiss_index = FaissIndex( )
        self.faiss_index.load( faiss_path, metadata_path )

    
    #function to search the Faiss index
    def _search( self, probe, k=5, metric='euclidean' ):
        faiss_search_ivf = FaissSearch( self.faiss_index, metric= metric )
        return faiss_search_ivf.search( probe, k = k)
    
    def _encode( self, query ):
        embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        return embedding_model.encode([query])
    
    
    #function to get the similar chunks by distance
    def search_neighbors(self, query, index_path, meta_path,  k=10, return_documents = False):
        #load the embeddings
        self._load_embeddings(faiss_path = index_path, metadata_path = meta_path )
        #Change the format of the meta data
        #self.faiss_index.metadata = self.faiss_index.metadata[0]
        #print the question
        print("QUERY:", query)
        print('')
        #embed the question
        query_embedding = self._encode( query )
        #embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        #query_embedding = embedding_model.encode([query])
        #get the distances
        distances_ivf, indices_ivf, metadata_ivf = self._search(query_embedding, k=k)
        #if the user wants to return the documents
        if return_documents:
            return_list = []
            for i in range(k):
                return_list.append(metadata_ivf[i])
            return return_list
        else:
            for i in range(k):
                print(f"Neighbor {i+1}: Index {indices_ivf[0][i]}, Distance {distances_ivf[0][i]}, Documents: {metadata_ivf[i]}")
                print('')



    def similar_by_rerank(self, query, index_path, meta_path, rerank_type = 'hybrid',  k=5, return_documents = False):
        #load the embeddings
        self._load_embeddings(faiss_path = index_path, metadata_path = meta_path )
        #initialize the reranker
        reranker = Reranker( type= rerank_type )
        #print the question
        print("QUERY:", query)
        print('')
        #get the distances
        ranked_documents, ranked_indices, scores = reranker.rerank(query, context=self.faiss_index.metadata)
        #if the user wants to return the documents
        if return_documents:
            return_list = []
            for i in range(k):
                return_list.append( f"Rerank Document {i+1}: Scores {scores[i]}, Documents: {ranked_documents[i]}" )
            return return_list
        else:
            for i in range(k):
                print(f"Rerank Document {i+1}: Scores {scores[i]}, Documents: {ranked_documents[i]}")
                print('')



    def generate_answer(self, query, index_path, meta_path, rerank = True, temperature=0.2, rerank_type = 'hybrid',  k=5, return_documents = False):
        #load the embeddings
        self._load_embeddings(faiss_path = index_path, metadata_path = meta_path )
        if rerank:
            #initialize the reranker
            reranker = Reranker( type= rerank_type )
            ranked_documents, ranked_indices, scores = reranker.rerank('hello world', context=['hello world', 'random sequence of words'])
            #print the question
            print("QUERY:", query)
            print('')
            #get the distances
            ranked_documents, ranked_indices, scores = reranker.rerank(query, context=self.faiss_index.metadata)
            #if the user wants to return the documents
            if return_documents:
                return_list = []
                for i in range(k):
                    return_list.append( f"Rerank Document {i+1}: Scores {scores[i]}, Documents: {ranked_documents[i]}" )
                return return_list
            else:
                for i in range(k):
                    print(f"Rerank Document {i+1}: Scores {scores[i]}, Documents: {ranked_documents[i]}")
                    print('')
                #return self.similar_by_rerank(query, index_path, meta_path, rerank_type = rerank_type, k=k, return_documents = return_documents)
        else:
            generator_model = "mistral-large-latest"
            generator = QA_Generator(api_key = self.api_key, temperature = temperature, generator_model = generator_model )
            answer = generator.generate_answer(query, self.faiss_index.metadata) 
            if return_documents:
                return answer
            else:
                print(answer)
                print('')

    #function to determine the top k indices (k argmax values)
    def _top_k(self, arr, k):
        #list to store indices
        top_k_indices = []
        #make a copy of the array
        list_copy = arr.copy()
        #get the min value of the array and make it smaller
        min_val = np.min(list_copy) - 1
        #loop through the array k times
        for i in range(k):
            #get the index of the max value
            max_ind = np.argmax(list_copy)
            #append the index to the list
            top_k_indices.append(max_ind)
            #delete the max value from the list
            list_copy[max_ind] = min_val
        return top_k_indices
    
    #function to generate the answer
    def generate_answer( self, query, index_path, meta_path, rerank = True, rerank_type = 'tfidf', k_neighbors = 15, k_rerank = 5):
        generator_model = "mistral-large-latest"
        generator = QA_Generator(api_key = self.api_key, temperature=0.2, generator_model=generator_model)
        #get the neighbors using k nearest neighbors
        top_documents = self.search_neighbors(query, index_path, meta_path,  k = k_neighbors, return_documents = True)
        #if user wants to rerank
        if rerank:
            #initialize the reranker
            reranker = Reranker( type = rerank_type )
            #get the reranks
            ranked_documents, ranked_indices, scores = reranker.rerank( query, context = top_documents )
            #get the indices for top k_rerank scores
            top_indices = self._top_k(scores, k_rerank)
            #get the top k_rerank documents
            top_documents = [ranked_documents[i] for i in top_indices]
        #generate the answer
        return generator.generate_answer(query, top_documents)


    

if __name__ == 'main':

    pp = Pipeline(api_key = "PQE1QZkycfApyEuz1fdIDJjri2HdEjKD")

    method = ('sentence', '4')
    f"storage/catalog/index_{method[0]}_{method[1]}"
    f"storage/catalog/index_metadata_{method[0]}_{method[1]}"
    query = 'Did Webster write, "I can now sleep of nights"?'
    query = 'who was Abraham Lincoln?'

    pp.generate_answer( query, f"storage/catalog/index_{method[0]}_{method[1]}", f"storage/catalog/index_metadata_{method[0]}_{method[1]}", rerank = True, rerank_type = 'hybrid', k_neighbors = 15, k_rerank = 15)



    
    #initialize pipeline
    pp = Pipeline()
    #load the embeddings
    pp._load_embeddings(faiss_path = f"storage/catalog/index_sentence_4", metadata_path = f"storage/catalog/index_metadata_sentence_4" )
    #Change the format of the meta data
    pp.faiss_index.metadata = pp.faiss_index.metadata[0]

    #pp1 = Pipeline()
    #query = "Was Abraham Lincoln the sixteenth President of the United States?"
    #pp1.similar_by_distance(query, 'storage/catalog/index_sentence_2', 'storage/catalog/index_metadata_sentence_2',  k=5)
    pp1 = Pipeline()
    file = 'S08_set3_a3.txt.clean'#'S08_set3_a4.txt.clean'
    query = "Was Abraham Lincoln the sixteenth President of the United States?"
    method = ('sentence', '4')
    pp1.similar_by_distance(query, f"storage/catalog/index_{method[0]}_{method[1]}_{file}", f"storage/catalog/index_metadata_{method[0]}_{method[1]}_{file}",  k=5)
    pp1.similar_by_rerank(query, f"storage/catalog/index_{method[0]}_{method[1]}_{file}", f"storage/catalog/index_metadata_{method[0]}_{method[1]}_{file}" )




