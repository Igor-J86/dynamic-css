import { PROP_MAP } from '../../script';

const Main = () => {
  return (
    <main className="pa[2rem] maxw[58rem] ma[auto]">
      <h1>Dynamic CSS Docs</h1>
      <p>
        This is a demo application showcasing the usage of Dynamic CSS Utilities. The package generates CSS classes based on specific patterns found in your components' class or className attributes.
      </p>

      <div className="d[flex] fw[wrap] gap[2rem] mt[2rem]">
        <div className="fb[10rem] fg[1] fs[1]">
          <h2>Available Utilities</h2>
          <dl className="w[100%]">
          {Object.entries(PROP_MAP).map(([key, value]) => (
            <div key={key} className="d[flex] gap[0.5rem] pa[0.5rem]">
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          </dl>
        </div>

        <div className="fb[24rem] fg[1] fs[1]">
          <h2>Usage Examples</h2>
          <div className="pa[1rem] bg[--primaryRed] mb[1rem] bs[solid] bc[hsl(0,100%,80%)] bw[2px] br[10px]">
            <pre className="ma[0] color[white] ws[pre-wrap]">
{`<div className="w[28rem] maxw[100%] pa[1rem] bg[--primaryRed] mb[1rem] bs[solid] bc[hsl(0,100%,80%)] bw[2px] br[10px]">
  This div is just a simple example.
</div>`}
            </pre>
          </div>

          <div className="pa[1rem] bg[#f2f2f2] mb[1rem] br[10px]">
            <pre className="ma[0] ws[pre-wrap]">
{`<div className="w[28rem] maxw[100%] pa[1rem] bg[#f2f2f2] mb[1rem] br[10px]">
  This div is just a simple example.
</div>`}
            </pre>
          </div>

          <div className="pa[1rem] bg[#f2f2f2] mb[1rem] br[10px]">
            <div className="d[flex] fw[wrap] gap[1rem] mb[1rem]">
              <button className="pa[0.8rem] bg[#007acc] color[white] br[5px] bs[none]">
                Button Example
              </button>
              <button className="pa[0.8rem] bg[teal] color[white] br[5px] bs[none]">
                Button Example
              </button>
              <button className="pa[0.8rem] bg[purple] color[white] br[5px] bs[none]">
                Button Example
              </button>
            </div>
            <pre className="ma[0] ws[pre-wrap]">
{`<button className="pa[0.8rem] bg[#007acc] color[white] br[5px] bs[none]">
  Click Me
</button>`}
            </pre>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main;