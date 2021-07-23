'use strict';

module.exports = (CombosForProjects) => {
  CombosForProjects.createCombosForProjects = async (data) => {
    const {availabitiesCombos, dataProject} = data;
    const combosForCreate = [];
    let result;
    if (availabitiesCombos && availabitiesCombos.length) {
      for (let index = 0; index < availabitiesCombos.length; index++) {
        const combo = availabitiesCombos[index];
        combo.projectId = dataProject.id;
        combosForCreate.push(combo);
      }
      result = await CombosForProjects.create(combosForCreate);
    }

    return result;
  }
};
