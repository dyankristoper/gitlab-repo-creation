const group = require("./src/group/group");
const project = require("./src/project/project");

const WDPRO_BATCH5_GID = 103342863;


/*
 *  swap this out with an personal access token generated following
 *  https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html
 *  this was tested using token with scope `api`
*/


/**
 *  Change for each repo you want to create under Student's subgroup
 *  samples are activities, projects, etc.
 */
project.createProjectsOnSubGroups(
  WDPRO_BATCH5_GID,
  "Activities",
  "activities",
  "Repository for compiling student activities"
);

project.createProjectsOnSubGroups(
  WDPRO_BATCH5_GID,
  "Homeworks",
  "homeworks",
  "Repository for compiling student homeworks"
);

project.createProjectsOnSubGroups(
  WDPRO_BATCH5_GID,
  "Projects",
  "projects",
  "Repository for compiling personal projects"
);

/**
 
use these to create the student's subgroups
swap out name and path with student names/nicknames
then pass the [batch] group id in group.createSubgroup*/

const subGroups = [
  {
    name: "Cloney Mari Carandang",
    path: "Cloney",
  }
];


for (const subGroup of subGroups) {
  console.log(`creating for ${subGroup.name}`);
  group.createSubgroup(WDPRO_BATCH5_GID, subGroup.name, subGroup.path);
}


/**
 *  these were used when we renamed batch-8 activities and homework groups to deprecated.
 */

// const renameSubgroups = async () => {
//   const studentFolders = await group.getSubgroups(BATCH_8_GID);
//   for (const studentFolder of studentFolders) {
//     console.log(
//       `Student info:${studentFolder.id} ${studentFolder.name} ${studentFolder.path}`
//     );
//     const subGroups = await group.getSubgroups(studentFolder.id);
//     for (const subGroup of subGroups) {
//       console.log(
//         `Subgroup info:${subGroup.id} ${subGroup.name} ${subGroup.path}`
//       );
//       if (subGroup.path === "practice" || subGroup.path === 'homework') {
//         console.log("should rename this");
//         group.updateGroup(subGroup.id, {
//           name: `Deprecated---${subGroup.name}`,
//           path: `deprecated---${subGroup.path}`
//         });
//       }
//     }
//   }
// };

// renameSubgroups();
