import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common';

// Example for rendering state to app
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../../state/actions';

function RenderHomePage(props) {
  const { userInfo, authService } = props;

  // example for rendering state
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1>
      <div>
        <p>
          This is an example of a common example of how we'd like for you to
          approach components.
        </p>

        {/* example displaying info from store/state */}
        <h3>Counter: {counter}</h3>
        <button onClick={() => dispatch(increment(5))}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        {isLogged ? <h4>valuable information I shouldn't see</h4> : ''}
        
        <p>
          <Link to="/profile-list">Profiles Example</Link>
        </p>
        <p>
          <Link to="/example-list">Example List of Items</Link>
        </p>
        <p>
          <Link to="/datavis">Data Visualizations Example</Link>
        </p>
        <p>
          <Button
            handleClick={() => authService.logout()}
            buttonText="Logout"
          />
        </p>
      </div>
    </div>
  );
}
export default RenderHomePage;
