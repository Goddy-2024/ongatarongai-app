import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";

const Header = ({ resetView, activeAccount }) => {
  const handleLogoClick = (e) => {
    e.target.classList.add("spin");
    setTimeout(() => {
      e.target.classList.remove("spin");
      resetView();
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!activeAccount) {
        const account1 = document.getElementById("account-1");
        const header = document.getElementById("main-header");
        const caption = document.querySelector("caption");
        const thead = document.querySelector("thead");

        if (account1) {
          const rect = account1.getBoundingClientRect();
          if (rect.top <= header.offsetHeight + caption.offsetHeight) {
            header.classList.add("blurred");
            caption.classList.add("blurred");
            thead.classList.add("blurred");
          } else {
            header.classList.remove("blurred");
            caption.classList.remove("blurred");
            thead.classList.remove("blurred");
          }
        }
      } else {
        document.getElementById("main-header").classList.remove("blurred");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeAccount]);

  return (
    <header id="main-header">
      <img src="repentlogo.png" alt="Repentance and Holiness" onClick={handleLogoClick} />
      <br />
      {!activeAccount && (
        <span className="heading">
          <strong>ONGATA RONGAI MAIN ALTAR</strong>
        </span>
      )}
    </header>
  );
};

const Content = ({ setActiveAccount }) => {
  const accounts = [
    { name: "Church Account", number: "0723653922" },
    { name: "Tithes and Offerings", number: "0723456789" },
    { name: "Missions", number: "0729876543" },
    { name: "Central Ministry", number: "0721234567" }
  ];

  const contacts = [
    { name: "Snr. Pst Victor", number: "0723653922" },
    { name: "Snr. Pst Imelda", number: "0723456789" },
    { name: "Pst Steve", number: "0729876543" },
    { name: "Pst Pius", number: "0721234567" }
  ];

  return (
    <section className="content">
      <table id="accncont">
        <caption>
          <h2>CONTACTS & ACCOUNTS</h2>
        </caption>

        <thead>
          <tr>
            <th className="heads">CONTACTS</th>
            <th>ACCOUNTS</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index} className="mod">
              <td>
                <span id={index === 0 ? "account-1" : ""} onClick={() => setActiveAccount(contact)}>
                  {contact.name}
                </span>
              </td>
              <td>
                <span onClick={() => setActiveAccount(accounts[index])}>
                  {accounts[index].name} - {accounts[index].number}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const AccountDetails = ({ account }) => (
  <div className="account-details">
    <h1>{account.name}</h1>
    <p>
      <strong>{account.number}</strong>
    </p>
  </div>
);

function App() {
  const [activeAccount, setActiveAccount] = useState(null);

  const resetView = () => setActiveAccount(null);

  return (
    <div className="App">
      <Header resetView={resetView} activeAccount={activeAccount} />
      {activeAccount ? (
        <AccountDetails account={activeAccount} />
      ) : (
        <Content setActiveAccount={setActiveAccount} />
      )}
    </div>
  );
}

export default App;
