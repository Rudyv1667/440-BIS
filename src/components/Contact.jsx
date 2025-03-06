import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Contacto = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const emailParams = {
      from_name: formData.user_name.trim(),
      user_name: formData.user_name.trim(),
      user_email: formData.user_email.trim(),
      message: formData.message.trim(),
    };
     
    emailjs
      .send(
        "service_5ca4ae5",
        "template_h3xp6f9",
        emailParams,
        "ZKk2xDJLgFNczbuua"
      )
      .then(
        (response) => {
          console.log("✅ Tu mensaje se ha enviado exitosamente!", response.status, response.text);
          setSuccess(true);
          setError(false);
          setFormData({ user_name: "", user_email: "", message: "" });
  
          // 🕒 Make success message disappear after 3 seconds
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        },
        (err) => {
          console.error("❌ El mensaje no se envió...", err);
          setError(true);
          setSuccess(false);
        }
      );
  };  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <br />
      <br />
      <br />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contáctanos</h1>

      {/* Contact Info */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mb-6">
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center">
            <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-3" />
            <span>+54 9 2974 288934</span>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-red-500 mr-3" />
            <span>
              <a href="mailto:yvrudy@hotmail.com" className="text-blue-500 hover:underline">
                yvrudy@hotmail.com
              </a>
            </span>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500 mr-3" />
            <span>El Choique 622, Caleta Olivia, Santa Cruz</span>
          </li>
        </ul>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <label className="block mb-2 text-gray-700">Nombre</label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          className="w-full p-2 border text-black border-gray-300 rounded mb-4"
          required
        />

        <label className="block mb-2 text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          className="w-full p-2 border text-black border-gray-300 rounded mb-4"
          required
        />

        <label className="block mb-2 text-gray-700">Mensaje</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border text-black border-gray-300 rounded mb-4 h-32"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Enviar Mensaje
        </button>

        {success && <p className="text-green-600 mt-3">¡Mensaje enviado con éxito!</p>}
        {error && <p className="text-red-600 mt-3">Error al enviar el mensaje. Inténtalo de nuevo.</p>}
      </form>
    </div>
  );
};

export default Contacto;
