  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // Direct POST to your local dashboard server via ngrok tunnel:
      const response = await fetch("https://undertow-alienable-snowsuit.ngrok-free.dev/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone || "Not provided",
          email: formData.email,
          message: formData.message || "Not provided",
        }),
      });
      const textData = await response.text();
      try {
        const result = JSON.parse(textData);
        if (result.success) {
          setStatus('success');
          setFormData({ name: '', email: '', phone: '', message: '' });
        } else {
          setStatus('idle');
          alert(result.error || "Something went wrong. Please check your inputs and try again.");
        }
      } catch {
        setStatus('idle');
        alert("Network processing delay. Please check your data connection and try again.");
      }
    } catch {
      setStatus('idle');
      alert("System intake error. Please resubmit your configuration details.");
    }
  };
