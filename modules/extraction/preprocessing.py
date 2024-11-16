import os
import re
from glob import glob
import numpy as np
import nltk
#nltk.download('punkt_tab')

class DocumentProcessing:
    """
    A class used for processing documents including reading, trimming whitespace,
    and splitting documents into sentence chunks.

    Methods
    -------
    __read_text_file(file_path: str) -> str
        Reads the content of a text file.
    
    trim_white_space(text: str) -> str
        Trims extra whitespace from the given text.
    
    split_document(document_filename: str, sentences_per_chunk: int) -> list
        Splits the document into chunks of specified number of sentences.
    """

    def __init__(self):
        """Initializes the DocumentProcessing class."""
        pass

    def _read_text_file(self, file_path):
        """
        Reads the content of a text file.

        :param file_path: The path to the text file.
        :type file_path: str
        :return: The content of the text file or an error message.
        :rtype: str
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            return content
        except FileNotFoundError:
            return f"The file at {file_path} was not found."
        except Exception as e:
            return f"An error occurred: {e}"

    def trim_white_space(self, text):
        """
        Trims extra whitespace from the given text.

        :param text: The text to be trimmed.
        :type text: str
        :return: The trimmed text.
        :rtype: str
        """
        return ' '.join(text.split())
    
    def sentence_chunking(self, document_filename, overlap_size = 2):
        """
        Splits the document into chunks of specified number of sentences.

        :param document_filename: The filename of the document to be split.
        :type document_filename: str
        :param sentences_per_chunk: The number of sentences per chunk.
        :type sentences_per_chunk: int
        :return: A list of chunks, each containing the specified number of sentences.
        :rtype: list
        """
        text = self._read_text_file(document_filename)
        
        #remove document error message about length of document
        error_message = 'An error occurred: [Errno 63] File name too long: '
        len_error_message = len(error_message)
        if error_message == text[0:len_error_message]:
            text = text[len_error_message:]

        # Preprocessing
        text = self.trim_white_space(text)

        # Split documents into sentence chunks
        sentences = nltk.sent_tokenize(text)

        # Create chunks of the specified number of sentences
        max_index = len(sentences)
        chunks = []
        for i in range( max_index ):
            chunks.append(' '.join(sentences[i:i + overlap_size]))
            if i + overlap_size >= max_index:
                break
        #chunks = [' '.join(sentences[i:i + overlap_size]) for i in range(0, len(sentences), overlap_size)]
        return chunks
    
    def fixed_length_chunking(self, document_filename, fixed_length = 60, overlap_size = 2):

        text = self._read_text_file(document_filename)

        #remove document error message about length of document
        error_message = 'An error occurred: [Errno 63] File name too long: '
        len_error_message = len(error_message)
        if error_message == text[0:len_error_message]:
            text = text[len_error_message:]

        # Preprocessing
        text = self.trim_white_space(text)

        chunks = []
        chunk = ''
        #loop through each character in the document
        for char in text:
            #add character to chunk
            chunk += char
            #if chunk is greater than or equal to the specified character length
            if len(chunk) >= fixed_length:
                #if character is a space (end of a word)
                if char == ' ':
                    #delete last space
                    chunk = chunk[ :-1 ]
                    chunks.append( chunk )
                    #reverse loop though chunk to find last space
                    counter = 0
                    for i in range( len( chunk )-1, -1, -1):
                        counter += 1
                        #if counter is greater than or equal to the specified overlap
                        if counter >= overlap_size:  
                            #if character is a space (end of a word)  
                            if chunk[i] == ' ':
                                chunk = chunk[ ( i + 1 ): len( chunk ) ] + ' '
                                break

        #append the last chunk
        chunks.append( chunk )
        return chunks



if __name__ == "__main__":
    processing = DocumentProcessing()

    processing._read_text_file("storage/corpus/S08_set3_a6.txt.clean")

    # Example to split documents into chunks
    
    chunks = processing.sentence_chunking("storage/corpus/S08_set3_a1.txt.clean", overlap_size=3)
    for idx, chunk in enumerate(chunks):
        print(idx, chunk)
        print('')
        if idx == 0:
            break


