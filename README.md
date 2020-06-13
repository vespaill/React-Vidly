### Mastering React—Learning Summaries

#### 3. Components

- Using **JSX** (JavaScript XML) to improve readability when writing HTML in React.
- Rendering Lists by mapping strings to JSX expressions.
- Conditional Rendering.
- Handling events.
- Updating the state: Whenever a component's state is changed with `setState()` method that component is re-rendered.

#### 4. Composing Components

- How to use **props** to pass data to components.
- How to raise and handle events.
- How to lift the state up in order to have multiple components sharing the same data and working in sync.
- Using **Functional components**: components that are stateless and defined as a function as opposed to a class.
- How to use **Lifecycle hooks**. These are special methods that, when defined on a component, are automatically called by React at certain moments. They allow us to hook into certain moments during the lyfecycle of a component and execute some code.

<table>
  <tr>
    <td>
      <h4>Mounting Phase hooks</h4>
      <small>
        <ol>
          <li>constructor</li>
          <li>render</li>
          <li>componentDidMount</li>
        </ol>
      </small>
    </td>
    <td>
      <h4>Update Phase hooks</h4>
      <small>
        <ol>
          <li>render</li>
          <li>componentDidUpdate</li>
          <br />
        </ol>
      </small>
    </td>
    <td>
      <h4>Unmounting Phase hooks</h4>
      <small>
        <ol>
          <li>componentWillUnmount</li>
          <br />
          <br />
        </ol>
      </small>
    </td>
  </tr>
</table>
