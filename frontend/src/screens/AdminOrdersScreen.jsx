import React from "react";

const AdminOrdersScreen = () => {
  return (
    <>
      <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
          <div class="relative">
            <input
              type="text"
              placeholder="Search..."
              class="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 w-64"
            />
            <button class="absolute right-0 top-0 mt-2 mr-2">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 15l5-5m0 0l-5-5m5 5h-13"></path>
              </svg>
            </button>
          </div>

          <div class="space-x-4">
            <button class="bg-green-400 hover:bg-green-500 rounded-lg h-10 w-36 text-center">
              Generate Report
            </button>
            <button class="bg-blue-400 hover:bg-blue-500 rounded-lg h-10 w-36 text-center">
              Generate Report
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <div class="min-w-full">
            <div class="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Delivary
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">Jane Doe</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      jane@example.com
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">Admin</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <button class="ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                        View
                      </button>
                      <button class="ml-2 px-4 py-2 font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:shadow-outline-blue active:bg-yellow-600 transition duration-150 ease-in-out">
                        Edit
                      </button>
                      <button class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrdersScreen;
