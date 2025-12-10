import { PROP_MAP } from '../../script';

const Main = () => {
  return (
    <main className="pa[2rem] maxw[52rem] ma[auto] bg[#000000]">
      <h1>Dynamic CSS Docs</h1>
      <p>
        This is a demo application showcasing the usage of Dynamic CSS Utilities. The package generates CSS classes based on specific patterns found in your components' className attributes.
      </p>

      <h2>Usage Example</h2>
      <pre>
        {`<div className="w[100px] h[50px] bg[#ff0000]">
  This div is 100px wide, 50px tall, and has a red background.
</div>`}
      </pre>

      <h2>Available Utilities</h2>
      <dl className="flex flex-dir-col gap[0.5rem]">
      {Object.entries(PROP_MAP).map(([key, value]) => (
        <div key={key} className="flex gam">
          <dt>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
      </dl>
    </main>
  )
}

export default Main;