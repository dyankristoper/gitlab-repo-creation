const axios = require("axios").default;

const group = require("../group/group");
const { getAuthorizationHeader } = require('../utils/helpers');

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
  } catch (err) {
    console.error(err);
  }
};

const createProjectsOnSubGroups = async (
  groupId,
  repositoryName,
  repositoryPath,
  description
) => {
  console.log(`${ new Date() } -- Trying to fetch subgroups`);
  const studentGroups = await group.getSubgroups(groupId);

  console.log(`${ new Date() } -- Iterating through results`);

  for (const studentGroup of studentGroups) {
    if (studentGroup.id !== 15420965 && studentGroup.id !== 15380661) {
      console.log(`${ new Date() } -- Creating for ${studentGroup.name} : ${studentGroup.id}`);
      await createRepository(
        studentGroup.id,
        repositoryName,
        repositoryPath,
        description
      );
    } else {
      console.log("not creating for JAG or Marvs");
    }
  }
};

const updateProject = (projectData) => {
  console.log(projectData);
};

module.exports = {
  createProjectsOnSubGroups,
};
