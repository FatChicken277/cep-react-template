function loadJSX(filename) {
  const cs = new CSInterface();
  const extensionRoot = cs.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
  cs.evalScript(`$.evalFile("${extensionRoot + filename}")`);
}

export default function App() {
  // Cargar el archivo ExtendScript al iniciar
  window.addEventListener("load", () => {
    loadJSX("main.jsx");
  });

  // Ejecutar una función definida en main.jsx
  const runScript = () => {
    new CSInterface().evalScript("sayHello()");
  };

  return (
    <div>
      <h1>Hola desde React</h1>
      <button onClick={runScript}>Ejecutar ExtendScript</button>
    </div>
  );
}
