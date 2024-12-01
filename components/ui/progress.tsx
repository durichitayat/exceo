interface ProgressProps {
  value: number;
  className?: string;
}

export default function Progress({ value, className }: ProgressProps) {
  return (
    <div>
      <h4 className="sr-only">Status</h4>
      <p className="text-sm font-medium text-gray-900">
        Migrating MySQL database...
      </p>
      <div
        aria-hidden="true"
        className="mt-6"
      >
        <div
          className={`overflow-hidden rounded-full bg-gray-200 ${
            className || ""
          }`}
        >
          <div
            style={{ width: `${value}%` }}
            className="h-2 rounded-full bg-black"
          />
        </div>
        {/* <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
          <div className="text-black">Copying files</div>
          <div className="text-center text-black">Migrating database</div>
          <div className="text-center">Compiling assets</div>
          <div className="text-right">Deployed</div>
        </div> */}
      </div>
    </div>
  );
}
