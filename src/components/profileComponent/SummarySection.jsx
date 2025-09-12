export default function SummarySection({ about }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <p className="text-gray-700">{about || "No summary yet."}</p>
      </div>
    );
  }
  