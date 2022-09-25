import * as uwuTK from '../src/index.js';

const helloUwu = 'UwU UwU UwU UwU UwU UwU UwU UwU ~w~ OwO'
  + 'UwU UwU UwU UwU ~w~ OwO UwU UwU OwO UwU UwU UwU OwO UwU UwU'
  + 'UwU OwO UwU OwO UwU UwU UwU UwU °w° °w° °w° °w° °w° QwQ ¯w¯'
  + 'OwO UwU OwO UwU OwO QwQ OwO OwO QwQ OwO UwU ~w~ °w° ¯w¯ °w°'
  + 'QwQ ¯w¯ OwO OwO @w@ OwO QwQ QwQ QwQ @w@ OwO OwO OwO QwQ @w@'
  + '@w@ °w° °w° °w° UwU UwU UwU UwU UwU UwU UwU UwU UwU UwU @w@'
  + 'OwO OwO @w@ °w° QwQ @w@ °w° @w@ OwO OwO OwO @w@ @w@ °w° °w°'
  + '°w° QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ @w@ OwO OwO'
  + 'UwU @w@ OwO OwO UwU UwU @w@';

try {
  const helloJS = uwuTK.transpileToJavaScript(helloUwu);
  const hello = new Function(`${helloJS}return run().output;`);

  console.log(hello());
} catch (err) {
  console.error(`Error: ${err.message}`);
}
