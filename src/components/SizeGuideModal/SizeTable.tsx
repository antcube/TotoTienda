import type { SizeRow } from '../../data/sizeguides';

interface SizeTableProps {
  sizes: SizeRow[];
  title?: string;
}

export default function SizeTable({ sizes, title }: SizeTableProps) {
  return (
    <div className="overflow-x-auto">
      {title && <h4 className="text-base font-semibold text-gray-700 mb-3">{title}</h4>}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2 text-center font-semibold">US</th>
            <th className="border border-gray-300 px-3 py-2 text-center font-semibold">EU</th>
            <th className="border border-gray-300 px-3 py-2 text-center font-semibold">Largo (cm)</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((size, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{size.us}</td>
              <td className="border border-gray-300 px-3 py-2 text-center">{size.eu}</td>
              <td className="border border-gray-300 px-3 py-2 text-center">{size.cm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
