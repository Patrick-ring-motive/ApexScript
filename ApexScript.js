var compilerId = new Date().getTime();

Object.getAllKeys=function (obj) {
    let keys = [];
  
    if (!(obj instanceof Object)) {
        obj = Object.getPrototypeOf(obj);
    }
    while (obj) {
        keys = keys.concat(Reflect.ownKeys(obj));
        obj = Object.getPrototypeOf(obj);
    }
    return keys;
}


var objs = [];


function getFullObjectList(obj) {
  const keys = Object.getAllKeys(obj);
  const keys_length = keys.length;
  for (let i = 0; i < keys_length; i++) {
    try {
      const value = obj[keys[i]];


      if (value && typeof value == 'object') {


        if (objs.indexOf(value) < 0) {
          objs.push(value);
          getFullObjectList(value);
        }

      }
    } catch (e) { continue; }
  }
  return objs;
}

function reduceCase(bigObj) {
  const keys = Object.getAllKeys(bigObj);
  const keys_length = keys.length;
  for (let i = 0; i < keys_length; i++) {
    try {
      if (keys[i].toLowerCase() != 'location') {

        if (keys[i].toLowerCase() != keys[i]) {
          const propKey = keys[i];
          bigObj[propKey.toLowerCase()] = bigObj[propKey];
          Object.defineProperty(bigObj, propKey.toLowerCase(), {
            value: bigObj[propKey],
            get() {
              return this[propKey];
            },
            set(newValue) {
              this[propKey] = newValue;
            }
          });
          // bigObj[propKey.toLowerCase()] = bigObj[propKey];
        }
      }

    } catch (e) { continue; }
  }

}

const allObjects = getFullObjectList(globalThis);
reduceCase(Object.prototype);
reduceCase(HTMLElement.prototype);
reduceCase(HTMLParagraphElement.prototype);
ApexAttributes(allObjects);


function ApexAttributes(abj) {
  const abj_length = abj.length;

  for (let i = 0; i < abj_length; i++) {
    try {
      if (abj[i] != window.location) {
        reduceCase(abj[i]);
      }
    } catch (e) { continue; }
  }
}

const ApexScripts = document.querySelectorAll('script[type="text/apexscript" i],script[type="application/apexscript" i]');

const ApexScripts_length = ApexScripts.length;
for (let i = 0; i < ApexScripts_length; i++) {
  try {
    const compiledScript = compileApex(ApexScripts[i].innerHTML);
    const cScript = document.createElement('script');
    cScript.innerHTML = compiledScript;
    document.body.appendChild(cScript);
    ApexScripts[i].type = ApexScripts[i].type + '-x';
  } catch (e) { continue; }
}

function compileApex(scr) {
  let quotes = [];
  scr = scr.replaceAll('\/', 'escapedforwardslash' + compilerId);
  scr = scr.replaceAll("\'", 'escapedsinglequote' + compilerId);
  scr = scr.replaceAll('\"', 'escapeddoublequote' + compilerId);
  scr = scr.replaceAll('\`', 'escapedbacktick' + compilerId);

  const slashMatches = scr.match(/\/[^\/].*\//g);
  if (slashMatches) {
    const slashMatches_length = slashMatches.length;
    for (let i = 0; i < slashMatches_length; i += 2) {
      try {
        quotes.push(slashMatches[i]);
      } catch (e) { continue; }
    }
  }

  const sqMatches = scr.match(/'[^'].*'/g);
  if (sqMatches) {
    const sqMatches_length = sqMatches.length;
    for (let i = 0; i < sqMatches_length; i += 2) {
      try {
        quotes.push(sqMatches[i]);
      } catch (e) { continue; }
    }
  }

  const dqMatches = scr.match(/"[^"].*"/g);
  if (dqMatches) {
    const dqMatches_length = dqMatches.length;
    for (let i = 0; i < dqMatches_length; i += 2) {
      try {
        quotes.push(dqMatches[i]);
      } catch (e) { continue; }
    }
  }

  const btMatches = scr.match(/`[^`].*`/g);
  if (btMatches) {
    const btMatches_length = btMatches.length;
    for (let i = 0; i < btMatches_length; i += 2) {
      try {
        quotes.push(btMatches[i]);
      } catch (e) { continue; }
    }
  }

  scr = scr.toLowerCase();

  const quotes_length = quotes.length;
  for (let i = 0; i < quotes_length; i++) {
    scr = scr.replace(quotes[i].toLowerCase(), quotes[i]);
  }

  scr = scr.replaceAll('escapedforwardslash' + compilerId, '\/');
  scr = scr.replaceAll('escapedsinglequote' + compilerId, "\'");
  scr = scr.replaceAll('escapeddoublequote' + compilerId, '\"');
  scr = scr.replaceAll('escapedbacktick' + compilerId, '\`');
  console.log(quotes);
  return scr;
}