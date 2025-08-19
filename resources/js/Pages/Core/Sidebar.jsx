import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { RiGroup2Line, RiDashboardLine, RiCalendarEventFill, RiShieldStarLine, RiNumbersLine, RiTrophyLine, RiBarChartBoxAiLine, RiSettings2Line, RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";

const Sidebar = () => {
  
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { auth } = usePage().props;
  
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const toggleDropdown = debounce((index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  }, 100);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    router.delete(`login/${auth.user?.id}`);
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: (
        <RiDashboardLine className="w-5 h-5" />
      ),
      link: "/home"
    },
    {
      title: "Racers",
      icon: (
        <RiGroup2Line className="w-5 h-5" />
      ),
      link: "#",
      subItems: [
        { title: "List of Racers", link: "/client/racers" },
        { title: "Add Racer", link: "/client/racers/create" }
      ]
    },
    {
      title: "Events",
      icon: (
        <RiCalendarEventFill className="w-5 h-5" />
      ),
      link: "#",
      subItems: [
        { title: "List of All Events", link: "/client/events" },
        { title: "Add New Event", link: "/client/events/create" }
      ]
    },
    {
      title: "Heats",
      icon: (
          <RiShieldStarLine className="w-5 h-5" />
      ),
      link: "/client/heats"
    },
    {
      title: "Results",
      icon: (
        <RiNumbersLine className="w-5 h-5" />
      ),
      link: "#",
      subItems: [
        { title: "On Deck", link: "/client/on-deck" },
        { title: "Results per Heat", link: "/client/results" },
        { title: "Summary Results", link: "/client/results-summary" }
      ]
    },
    {
      title: "Awards",
      icon: (
        <RiTrophyLine className="w-5 h-5" />
      ),
      link: "/client/awards"
    },
    {
      title: "Reports",
      icon: (
        <RiBarChartBoxAiLine className="w-5 h-5" />
      ),
      link: "#",
      subItems: [
        { title: "Car Performance", link: "/client/reports/performance" },
        { title: "Heat Results Report", link: "/client/reports/heat-results" },
        { title: "Race Category Leaderboard", link: "/client/reports/leaderboards" }
      ]
    },
    // {
    //   title: "Set Up",
    //   icon: (
    //     <RiSettings2Line className="w-5 h-5" />
    //   ),
    //   link: "#",
    //   subItems: [
    //     { title: "Manage Teams", link: "/client/teams" },
    //     { title: "Manage Divisions", link: "/client/divisions" },
    //     { title: "Import Roster", link: "/client/import-roster" },
    //     { title: "Import Awards", link: "/client/import-awards" },
    //     { title: "Settings", link: "/client/settings" },
    //   ]
    // }
  ];

  return (
    <div className={`${isSidebarOpen ? 'w-72' : 'w-20'} sidebar-transition bg-white border-r border-gray-400 relative`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-100 mt-3">
        {isSidebarOpen ? (
          <div className="flex items-center pl-3">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d489e7ed-566f-4b90-9034-37efc3169c1f.png" 
              alt="Company logo - geometric abstract design in blue and white colors" 
              className="w-8 h-8 mr-2 rounded"
            />
            <h1 className="text-xl font-bold">PWDerby</h1>
          </div>
        ) : (
          <div className="flex items-center pl-3">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f73aaa2-e6b6-4567-9832-a739f757d85f.png" 
              alt="Company logo minimized version" 
              className="w-8 h-8 mx-auto rounded"
            />
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="text-white focus:outline-none cursor-pointer"
        >
          {isSidebarOpen ? (
            <RiArrowLeftDoubleLine className="w-5 h-5 text-gray-600" />
          ) : (
            <RiArrowRightDoubleLine className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

        {/* Menu Items */}
      <div className="px-3.5 py-2">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-1">
              <div className="relative">
                  <Link
                    href={item.link}
                    className={`flex items-center py-2 px-3.5 rounded-lg hover:bg-gray-100 ${
                      item.subItems && 'cursor-pointer'
                    } transition-opacity duration-200 ease-in-out`}
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                        toggleDropdown(index);
                      }
                    }}
                  >
                    <span className="flex-shrink-0 text-gray-600">
                      {item.icon}
                    </span>
                    {isSidebarOpen && (
                      <>
                        <span className="ml-3 text-gray-600">{item.title}</span>
                        {item.subItems && (
                          <span className="ml-auto text-gray-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 transform ${activeDropdown === index ? 'rotate-[90deg]' : ''}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                  {item.subItems && isSidebarOpen && (
                    <div className={`dropdown-content ${activeDropdown === index ? 'active' : ''}`}>
                      <ul className="ml-[38px] mt-3">
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex} className="mb-1">
                              <Link
                                href={subItem.link}
                                className="block p-2 text-sm rounded-lg hover:bg-gray-100 text-gray-600"
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 border-t border-indigo-700 p-2 w-full">
        <div className="relative">
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center w-full p-2"
          >
            <img 
              src={auth.user.display_photo}
              alt="User profile" 
              className="w-8 h-8 rounded-full"
            />
            {isSidebarOpen && (
              <>
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium">{ auth.user.fullname }</p>
                  <p className="text-xs text-gray-400">{auth.user.role}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-auto transform ${isUserDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
          <div className={`w-full dropdown-content ${isUserDropdownOpen && isSidebarOpen ? 'active' : ''}`} style={{ position: 'absolute', bottom: '100%', left: '0', zIndex: '10' }}>
              <ul className="mt-1">
                <li className="mb-1 border-t border-gray-300">
                  <Link href="/client/accounts" className="block p-2 text-sm rounded-lg">
                    Settings
                  </Link>
                </li>
                <li className="mb-1 border-t border-gray-300">
                  <button onClick={handleLogout} className="block p-2 text-sm rounded-lg">
                    Logout
                  </button>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;