require('dotenv').config();

const group = require("./src/group/group");
const project = require("./src/project/project");

const SAMPLE_GID = 103624982;

/**
 *  Change for each repo you want to create under Student's subgroup
 *  samples are activities, projects, etc.
 */

project.createProjectsOnSubGroups(
  SAMPLE_GID,
  "Activities",
  "activities",
  "Repository for compiling student activities"
);

project.createProjectsOnSubGroups(
  SAMPLE_GID,
  "Homeworks",
  "homeworks",
  "Repository for compiling student homeworks"
);

project.createProjectsOnSubGroups(
  SAMPLE_GID,
  "Projects",
  "projects",
  "Repository for compiling personal projects"
);

/**
use these to create the student's subgroups
swap out name and path with student names/nicknames
then pass the [batch] group id in group.createSubgroup
*/

const subGroups = [
  {
    name: "Student 005",
    path: "student_005"
  }
];

for (const subGroup of subGroups) {
  console.log(`${ new Date() } -- Creating for ${subGroup.name}`);
  group.createSubgroup(SAMPLE_GID, subGroup.name, subGroup.path);
}
