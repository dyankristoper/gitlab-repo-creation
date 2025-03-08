const axios = require("axios").default;

const group = require("../group/group");
const { getAuthorizationHeader, getDate } = require('../utils/helpers');

const GITLAB_API = "https://gitlab.com/api/v4";
const PROJECTS_ENDPOINT = "/projects";

const headers = getAuthorizationHeader();

const createRepository = async (
  namespaceId,
  repositoryName,
  repositoryPath,
  description
) => {
  try {
    const response = await axios.post(
      `${GITLAB_API}${PROJECTS_ENDPOINT}`,
      {
        name: repositoryName,
        path: repositoryPath,
        approvals_before_merge: 1,
        description: description,
        initialize_with_readme: true,
        visibility: "private",
        namespace_id: namespaceId,
      },
      {
        headers,
      }
    );

    console.log(`Successfully created ${repositoryName} under ${namespaceId}`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const protectBranch = async (
  namespaceId,
  branchName
) => {
  try {
    // No one is allowed to push and merge (--force)
    const protectedBranchConfig = {
      "allowed_to_push": [{"access_level": 0}],
      "allowed_to_merge": [{"access_level": 0}]
    };

    await axios.patch(
      `${ GITLAB_API }${ PROJECTS_ENDPOINT }/${ namespaceId }/protected_branches/${ branchName }`,
      protectedBranchConfig,
      { headers }
    );
  } catch (error) {
    console.error(`${ getDate() } -- Error on function: protectMainBranch`, error?.message || 'Server error' );
  }
}

const createProjectsOnSubGroups = async (
  groupId,
  repositoryName,
  repositoryPath,
  description
) => {
  console.log(`${ getDate() } -- Trying to fetch subgroups`);
  const studentGroups = await group.getSubgroups(groupId);

  console.log(`${ getDate() } -- Iterating through results`);

  for (const studentGroup of studentGroups) {
    const response = await createRepository(
      studentGroup.id,
      repositoryName,
      repositoryPath,
      description
    );

    await protectBranch(
      response?.data?.id,
      "main"
    );
  }
};


module.exports = {
  createProjectsOnSubGroups,
};
