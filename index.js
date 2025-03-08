const group = require("./src/group/group");
const project = require("./src/project/project");

const WDPRO_BATCH5_GID = 103342863;

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
then pass the [batch] group id in group.createSubgroup
*/

const subGroups = [];

for (const subGroup of subGroups) {
  console.log(`${ new Date() } -- Creating for ${subGroup.name}`);
  group.createSubgroup(WDPRO_BATCH5_GID, subGroup.name, subGroup.path);
}
