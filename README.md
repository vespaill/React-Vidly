### Mastering React—Learning Summaries

#### 3. Components

- Using **JSX** (JavaScript XML) to improve readability when writing HTML in React.
- Rendering Lists by mapping strings to JSX expressions.
- Conditional Rendering.
- Handling events.
- Updating the state: Whenever a component's state is changed with `setState()` method that component is re-rendered.

#### 4. Composing Components

- Passing data to components via **props**.
- Raisiing and handling events.
- Lifting the state up in order to have multiple components sharing the same data and working in sync.
- Using **Functional components**: components that are stateless and defined as a function as opposed to a class.
- Using **Lifecycle hooks**: special methods that when defined on a component are automatically called by React at certain moments. They allow us to hook into certain moments during the lyfecycle of a component and execute some code.

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

#### 5. Pagination, Filtering and Sorting

- Component design principles.
- Designing component interfaces—determining what data it should receive and what events it should raise.
- Building reusable components (ListGroup, Pagination, Table).
- Refactoring code.
- Writing clean code.

#### 6. Routing and Navigation

- Using Route Parameters.
- Using Query String.
- Redirecting users.
- Implementing Not Found (404) pages.
- Implementing Nested Routing

#### 7. Forms

- Implementing a login, registration forms.
- Implementing new movie form.
- Implementing movie search box.

#### 8. Calling Backend Services

#### 9. Authentication and Authorization

- Working with JSON Web Tokens.
- Calling protected API endpoints.
- Showing and hiding elements on UI depending on user permission.
- Protecting routes from unauthenticated or unauthorized users.
