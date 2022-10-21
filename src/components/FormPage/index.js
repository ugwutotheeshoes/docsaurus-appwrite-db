import styles from "./styles.module.css";
import { Client, Databases } from "appwrite";

const React = require("react");
const { useState } = React;

export default function Form() {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: "", message: "" });
    updateData();
  };

  const client = new Client();

  const databases = new Databases(client);

  client
    .setEndpoint("http://localhost/v1") // Your API Endpoint
    .setProject("634dc3c8bc9e1f3e40a3"); // Your project ID

  const updateData = () => {
    const promise = databases.createDocument(
      "634dd2db5926161c5c34",
      "634dd362e9035624d59e",
      "unique()",
      { message: `${formData.name} - ${formData.message}` }
    );

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  return (
    <div className={styles.features}>
      <div className={styles.feed}>
        <h1>Was this documentation helpful?</h1>
        <button onClick={toggle}>give a feedback</button>
      </div>
      {isOpen ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.App}>
            <div className={styles.label}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.label}>
              <label>Review</label>
              <textarea
                className={styles.textarea}
                type="text"
                name="message"
                placeholder="type here"
                value={formData.message}
                onChange={handleChange}
              />
              <button>send feedback</button>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
