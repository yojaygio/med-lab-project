import { supabase } from "@/utils/supabase";

export const revalidate = 0; // Add this line at the top of page.tsx

export default async function MedicalTestsPage() {
  // This satisfies the JOIN requirement by fetching names instead of IDs
  const { data: tests, error } = await supabase.from("medicaltests").select(`
  name,
  normalmin,
  normalmax,
  testcategories:idcategory ( name ),
  uom:iduom ( name )
`)

  if (error)
    return <div className="p-10">Error loading data. Check RLS policies.</div>;

  return (
    <div className="p-10 font-sans">
      <a
        href="/medicaltests"
        className="text-blue-500 underline hover:text-blue-700"
      >
        View Medical Lab Results →
      </a>
      <h1 className="text-3xl font-bold mb-8 text-indigo-900">
        Medical Lab Results
      </h1>

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
        <table className="w-full bg-white text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 font-semibold uppercase text-xs">
                Test Name
              </th>
              <th className="px-6 py-4 font-semibold uppercase text-xs">
                Category
              </th>
              <th className="px-6 py-4 font-semibold uppercase text-xs">
                Unit
              </th>
              <th className="px-6 py-4 font-semibold uppercase text-xs">
                Normal Min
              </th>
              <th className="px-6 py-4 font-semibold uppercase text-xs">
                Normal Max
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tests?.map((test: any, i: number) => (
              <tr
                key={i}
                className="hover:bg-indigo-50 transition-colors border-b"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {test.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {test.testcategories?.name || "Link Error"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {test.uom?.name || "Unit missing in DB"}
                </td>
                <td className="px-6 py-4 text-blue-600 font-mono font-bold">
                  {test.normalmin}
                </td>
                <td className="px-6 py-4 text-rose-600 font-mono font-bold">
                  {test.normalmax}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
