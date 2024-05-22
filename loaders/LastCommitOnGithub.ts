interface Props {
    owner: string;
    repo: string;
}

export interface GithubResult {
    owner: string;
    repo: string;
    lastUpdate: string;
    lastMessage: string;
}

async function getLastCommit(owner: string, repo: string) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    });
    const json = await response.json();

    console.log("json", json);

    const lastCommit = json[0];
    const lastMessage = lastCommit.commit.message;
    const lastUpdate = lastCommit.commit.author.date;

    return {
        owner,
        repo,
        lastUpdate,
        lastMessage
    };
}

export default async function loader(props: Props): Promise<GithubResult> {
    const {
        owner,
        repo
    } = props;

    return await getLastCommit(owner, repo);
}
