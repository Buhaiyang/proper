

function exchangePath2Router(path) {
  const result = [];
  path.split('/').forEach((item) => {
    if (item.indexOf('-') > 0) {
      let arr = '';
      item.split('-').forEach((sItem) => {
        arr += firstUpperCase(sItem);
      });
      if (arr) {
        result.push(arr);
      }
    } else {
      result.push(firstUpperCase(item));
    }
  });
  // const routePath = result.join('/');
  const [moduleName, ...pathName] = result;
  return {
    moduleName,
    modelName: firstLowerCase(moduleName).concat(pathName),
    pageName: pathName.join('/')
  };
}

function firstUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function firstLowerCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}


module.exports = exchangePath2Router;
