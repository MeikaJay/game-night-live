import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Signup.css";

export default function Signup() {
  const formRef = useRef();
  const [status, setStatus] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    const form = formRef.current;

    const isAgreed = form.querySelector('input[name="agree_terms"]').checked;
    if (!isAgreed) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }

    try {
      // 1. Send confirmation email to contestant
      await emailjs.sendForm(
        "service_6jf7u4x",
        "template_z5szm4d",
        form,
        "syHUa9ovtjn0eTfOL"
      );

      // 2. Send form details to you (admin)
      await emailjs.sendForm(
        "service_6jf7u4x",
        "template_4pbc5el",
        form,
        "syHUa9ovtjn0eTfOL"
      );

      setStatus("✅ Application submitted! Check your email.");
      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>🎉 Join Game Night Live</h2>
      <p style={{ textAlign: "center", fontSize: "14px", color: "#aaa" }}>
        Secure your spot — fun, games & bragging rights await!
      </p>

      <form className="signup-form" ref={formRef} onSubmit={sendEmail}>
        <input name="user_name" placeholder="Full Name" required />
        <input name="user_email" type="email" placeholder="Email Address" required />
        <input name="city_state" placeholder="City & State" />
        <input name="social_handle" placeholder="Social Media Handle (required)" required />
        <textarea name="fun_facts" placeholder="Tell us your favorite shows, music, hobbies, etc." />
        <input name="challenge_name" placeholder="Want to challenge someone? (optional)" />
        <input name="dual_registration" placeholder="Dual registration name (optional)" />

        <div className="checkbox-container">
          <input type="checkbox" name="agree_terms" required />
          <label>
            I am 21+ and agree to the{" "}
            <span
              style={{ color: "#00ffff", textDecoration: "underline", cursor: "pointer" }}
              onClick={() => setShowTerms(true)}
            >
              Terms & Conditions
            </span>
          </label>
        </div>

        <button type="submit" className="submit-btn">Submit Application</button>
        <p style={{ marginTop: "10px", textAlign: "center" }}>{status}</p>
      </form>

      {showTerms && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>📜 Game Night Live Terms & Conditions</h3>
            <div className="modal-body">
              <p>
                By submitting this form, you agree to allow Game Night Live to use your image, video, audio, name,
                and likeness in all promotional and broadcast content. Your personal contact info will never be sold or
                made public. This is a fun, free-to-play online show. You must be 21+ to appear as a contestant.
              </p>
              <p>
                You agree to participate respectfully, follow show rules, and understand that episodes are recorded and
                streamed online. Game Night Live reserves the right to remove or edit participation at any time. No spammers, scammers, or bots allowed.
              </p>
            </div>
            <button onClick={() => setShowTerms(false)} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}