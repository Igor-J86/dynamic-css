import { PROP_MAP } from '../../script';

const Main = () => {
  return (
    <main className="pa[2rem] maxw[52rem] ma[auto]">
      <h1>Dynamic CSS Docs</h1>
      <p>
        This is a demo application showcasing the usage of Dynamic CSS Utilities. The package generates CSS classes based on specific patterns found in your components' className attributes.
      </p>

      <h2>Usage Example</h2>
      <div className="w[42rem] maxw[100%] pa[1rem] bg[--primaryRed] mb[1rem]">
        <pre className="ma[0]">
          {`<div className="w[42rem] pa[1rem] bg[--primaryRed] mb[1rem]">
  This div is 42rem wide, 50px tall, and has a red background.
</div>`}
        </pre>
      </div>

      <h2>Available Utilities</h2>
      <dl className="d[flex] flex-dir[column] gap[0.5rem]">
      {Object.entries(PROP_MAP).map(([key, value]) => (
        <div key={key} className="d[flex] gap[0.5rem]">
          <dt>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
      </dl>
    </main>
  )
}

export default Main;