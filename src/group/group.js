const axios = require("axios").default;
const { getAuthorizationHeader } = require('../utils/helpers');

const GITLAB_API = "https://gitlab.com/api/v4";
const GROUPS_ENDPOINT = "/groups";

const headers = getAuthorizationHeader();

const getSubgroups = async (groupId) => {
  try {
    const response = await axios.get(
      `${GITLAB_API}${GROUPS_ENDPOINT}/${groupId}/subgroups?per_page=25`,
      { headers }
    );
    const subgroupArray = response.data;
    return subgroupArray;
  } catch (err) {
    console.error(err);
  }
};

const createSubgroup = async (parentId, groupName, groupPath) => {
  try {
    await axios.post(
      `${GITLAB_API}${GROUPS_ENDPOINT}`,
      {
        name: groupName,
        path: groupPath,
        visibility: "private",
        project_creation_level: "maintainer",
        auto_devops_enabled: false,
        parent_id: parentId,
        default_branch_protection: 1,
      },
      {
        headers,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

const updateGroup = async (groupId, groupInfo) => {
    console.log('Updating with groupInfo: ', groupInfo)
    try {
        await axios.put(`${GITLAB_API}${GROUPS_ENDPOINT}/${groupId}`, groupInfo, {
            headers
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    createSubgroup,
    getSubgroups,
    updateGroup
}