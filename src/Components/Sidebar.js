import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
