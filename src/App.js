import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Taplytics = window.Taplytics;

function App() {
  return (
    <Router basename="/tap-spa">
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>
        <Route
          path="/"
          exact
          component={() => (
            <>
              <h1>Home</h1>
              {Taplytics && Taplytics.featureFlagEnabled("showKitten") ? (
                <img alt="" src="//placekitten.com/200/300"/>
              ) : (
                <img alt="" src="//placebear.com/200/300"/>
              )}
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lorem risus, porta sed neque quis, egestas pharetra nisl. Proin scelerisque massa et magna vulputate laoreet. Praesent tempus consectetur venenatis. Cras tristique nisi sit amet ex pretium, eu semper quam mollis. Vestibulum nisl nunc, vulputate vitae eros a, mollis blandit tellus. Fusce augue ipsum, rhoncus id magna eu, laoreet pretium arcu. Phasellus ornare ut elit ut malesuada. In ac neque ut diam suscipit rhoncus. Pellentesque hendrerit nisi justo, eu iaculis massa ultricies eu. Integer feugiat congue ipsum quis elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec a rhoncus neque.</p>
            </>
          )}
        />
        <Route
          path="/about/"
          component={() => (
            <>
              <h1>About</h1>
              {Taplytics && Taplytics.featureFlagEnabled("showKitten") ? (
                <img alt="" src="//placekitten.com/250/300"/>
              ) : (
                <img alt="" src="//placebear.com/250/300"/>
              )}
              <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sagittis aliquam libero. Aenean eu vehicula nisi. Phasellus ut enim ac quam tempus lobortis non tristique ante. Suspendisse eget lobortis leo. Sed nec ante ac metus blandit dapibus non ut massa. Curabitur in nibh fermentum, lobortis ligula non, laoreet ante. Fusce varius varius velit, fringilla dapibus diam finibus quis. Pellentesque eget finibus nunc. Curabitur mattis efficitur posuere. Cras sed venenatis lorem. Curabitur vestibulum molestie elit eget dignissim. Mauris dapibus volutpat massa quis euismod. In hac habitasse platea dictumst. Integer iaculis leo neque, in tristique nisi iaculis ut.</p>
            </>
          )}
        />
        <Route
          path="/users/"
          component={() => (
            <>
              <h1>Users</h1>
              {Taplytics && Taplytics.featureFlagEnabled("showKitten") ? (
                <img alt="" src="//placekitten.com/150/300"/>
              ) : (
                <img alt="" src="//placebear.com/150/300"/>
              )}
              <p>Donec a enim quam. Mauris id ex molestie, eleifend nulla ac, eleifend diam. Fusce quis ipsum ut ante rhoncus tincidunt non in mi. Cras pulvinar velit id sollicitudin sollicitudin. Integer interdum turpis nisl, non posuere massa malesuada quis. Nam et aliquam odio. Integer vehicula consequat dignissim. Nam iaculis dictum lacus, sit amet facilisis diam posuere at. Fusce interdum tristique leo sit amet interdum. Etiam eget sem neque. In sem nibh, dapibus sed posuere a, laoreet eget nisl. Donec quis facilisis nisl. Nulla malesuada, neque in semper blandit, nulla velit dictum neque, nec molestie nunc sapien sit amet justo.</p>
            </>
          )}
        />
      </div>
    </Router>
  );
}

export default App;
