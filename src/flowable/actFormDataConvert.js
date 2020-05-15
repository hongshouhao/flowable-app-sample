class actFormDataConvert {
  to (actForm) {
    let data = {};
    actForm.fields.forEach(field => {
      data[field.id] = field.value
    });
    return data;
  }

  from (data, metadata) {
    let variables = [];
    this.generateModle(data, metadata.list, variables)
    return variables
  }

  generateModle (data, genList, variables) {
    for (let i = 0; i < genList.length; i++) {
      if (genList[i].type === 'grid') {
        genList[i].columns.forEach(item => {
          this.generateModle(data, item.list, variables)
        })
      } else {
        let variable = {}
        variable.name = genList[i].model
        variable.type = this.mapType(genList[i])
        if (data && Object.keys(data).indexOf(genList[i].model) >= 0) {
          variable.value = data[genList[i].model]
        }

        if (genList[i].scope) {
          variable.scope = genList[i].scope
        }
        variables.push(variable);
      }
    }
  }

  mapType (formItem) {
    switch (formItem.type) {
      case "input":
        switch (formItem.options.dataType) {
          case "integer":
            return "integer";
          case "number":
          case "float":
            return "double";
          default:
            return "string";
        }
      case "textarea":
      case "editor":
        return "string";
      case "number":
      case "slider":
        return "integer";
      case "date":
        return "date";
      case "switch":
        return "boolean";
      case "rate":
        return "double";
      case "time":
      case "color":
        return "string";
      case "imgupload":
        return "binary";
      case "fileupload":
        return "binary";
      case "text":
        return "string";
      case "radio":
        return "string";
      case "checkbox":
        return "string";
      case "select":
        return "string";
    }
    return "string";
  }
}
module.exports = new actFormDataConvert();