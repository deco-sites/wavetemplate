import type { GithubResult } from "../loaders/LastCommitOnGithub.ts";

export interface Props {
  github?: GithubResult;
}

export default function ({ github }: Props) {
  if (!github) return null;

  const { owner, repo, lastUpdate, lastMessage } = github;

  return (
    <div class="container mx-auto px-6 lg:px-0">
      <div class="flex flex-col items-center">
        <table class="w-full rounded-lg border border-gray-300 shadow-lg">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider">
                Informa o
              </th>
              <th class="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                Propriet rio
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {github.owner}
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                Nome do reposit rio
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {github.repo}
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                Última atualiza o
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                {lastUpdate}
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                Último coment rio
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                {lastMessage}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
