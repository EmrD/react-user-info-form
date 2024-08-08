import React, { useState, useEffect } from 'react';
import './App.css';
import { useAutoAnimate } from '@formkit/auto-animate/react';

function App() {
  const [progress, setProgress] = useState(0); 
  const [currentStep, setCurrentStep] = useState(1); // Aktif adım
  const [formData, setFormData] = useState({ name: '', age: '', job: '', about: '', opinion: '' });
  const { animationParent } = useAutoAnimate();

  const handleStepClick = (step) => {
    let newProgress;
    switch (step) {
      case 1:
        newProgress = 10;
        break;
      case 2:
        newProgress = 36;
        break;
      case 3:
        newProgress = 63;
        break;
      case 4:
        newProgress = 90;
        break;
      case 5:
        newProgress = 100;
        break;
      default:
        newProgress = 0; 
    }
    setProgress(newProgress);
    setCurrentStep(step);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    handleStepClick(1);
  }, []);

  useEffect(() => {
    if (currentStep === 5) {
      console.log('Form gönderildi:', JSON.stringify(formData));
    }
  }, [currentStep]);

  const isFormValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '' && formData.age.trim() !== '';
      case 2:
        return formData.job.trim() !== '';
      case 3:
        return formData.about.trim() !== '';
      case 4:
        return formData.opinion.trim() !== '';
      default:
        return false;
    }
  };

  return (
    <div className="p-8" >
      <div className="flex flex-col items-center">
        <div className="relative flex space-x-48 mb-4 items-center justify-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="relative flex items-center">
              <p
                className={`px-4 py-2 rounded ${currentStep === step ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
              >
                {step}. Adım
              </p>
              <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-10 w-8 h-8 rounded-full border-2 flex ${
                  step < currentStep
                    ? 'bg-blue-500 border-blue-500'
                    : step === currentStep
                    ? 'bg-blue-700 border-blue-700'
                    : 'bg-white border-gray-300'
                }`}
                style={{ zIndex: 1 }}
              >
                {step < currentStep && (
                  <svg
                    className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="relative w-full max-w-screen-lg mx-auto mt-8 mb-4">
          <div className="relative bg-gray-300 h-4 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-8">
          {currentStep === 1 && (
            <div className="flex flex-col items-center">
              <p className="font-semibold text-xl mb-2">Temel Bilgiler</p>
              <div className="w-full bg-black h-1 mb-4 rounded-full" style={{ width: `300%` }}></div>
              <div className="w-full mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-1">Ad Soyad</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-sm w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="w-full mb-4">
                <label htmlFor="age" className="block text-gray-700 mb-1">Yaş</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-sm w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between w-full mt-4 space-x-4">
                <button
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                  style={currentStep === 1 ? { opacity: 0.5 } : { opacity: 1 }}
                  disabled={currentStep === 1}
                  onClick={() => handleStepClick(currentStep - 1)}
                >
                  Önceki Adım
                </button>
                <button
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                  disabled={!isFormValid()}
                  onClick={() => handleStepClick(currentStep + 1)}
                  style={!isFormValid() ? { opacity: 0.5 } : { opacity: 1 }}
                >
                  Sonraki Adım
                </button>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex flex-col items-center">
              <p className="font-semibold text-xl mb-2">Kişisel Bilgiler</p>
              <div className="w-full bg-black h-1 mb-4 rounded-full" style={{ width: `300%` }}></div>
              <div className="w-full mb-4">
                <label htmlFor="job" className="block text-gray-700 mb-1">Meslek</label>
                <input
                  type="text"
                  id="job"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-sm w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between w-full mt-4 space-x-4">
                <button
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                  style={currentStep === 1 ? { opacity: 0.5 } : { opacity: 1 }}
                  disabled={currentStep === 1 }
                  onClick={() => handleStepClick(currentStep - 1)}
                >
                  Önceki Adım
                </button>
                <button
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                  disabled={!isFormValid()}
                  onClick={() => handleStepClick(currentStep + 1)}
                  style={!isFormValid() ? { opacity: 0.5 } : { opacity: 1 }}
                >
                  Sonraki Adım
                </button>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="flex flex-col items-center">
              <p className="font-semibold text-xl mb-2">İşletme Özelindeki Bilgiler</p>
              <div className="w-full bg-black h-1 mb-4 rounded-full" style={{ width: `300%` }}></div>
              <div className="w-full mb-4">
                <label htmlFor="about" className="block text-gray-700 mb-1">Bizi Nereden Duydunuz?</label>
                <input
                  type="text"
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-sm w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between w-full mt-4 space-x-4">
                <button
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                  style={currentStep === 1 ? { opacity: 0.5 } : { opacity: 1 }}
                  disabled={currentStep === 1}
                  onClick={() => handleStepClick(currentStep - 1)}
                >
                  Önceki Adım
                </button>
                <button
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                  disabled={!isFormValid()}
                  onClick={() => handleStepClick(currentStep + 1)}
                  style={!isFormValid() ? { opacity: 0.5 } : { opacity: 1 }}
                >
                  Sonraki Adım
                </button>
              </div>
            </div>
          )}
          {currentStep === 4 && (
            <div className="flex flex-col items-center">
              <p className="font-semibold text-xl mb-2">Düşünceleriniz</p>
              <div className="w-full bg-black h-1 mb-4 rounded-full" style={{ width: `300%` }}></div>
              <div className="w-full mb-4">
                <label htmlFor="opinion" className="block text-gray-700 mb-1">Bizimle Neden Çalışmak İsterdiniz?</label>
                <input
                  type="text"
                  id="opinion"
                  name="opinion"
                  value={formData.opinion}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-sm w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between w-full mt-4 space-x-4">
                <button
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                  style={currentStep === 1 ? { opacity: 0.5 } : { opacity: 1 }}
                  disabled={currentStep === 1 }
                  onClick={() => handleStepClick(currentStep - 1)}
                >
                  Önceki Adım
                </button>
                <button
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                  disabled={!isFormValid()}
                  onClick={() => handleStepClick(currentStep + 1)}
                  style={!isFormValid() ? { opacity: 0.5 } : { opacity: 1 }}
                >
                  Formu Tamamla Ve Gönder
                </button>
              </div>
            </div>
          )}

          {currentStep === 5 &&
            <div class="flex flex-col items-center">
            <p className="font-semibold text-xl mb-2">Formunuz Başarıyla İşleme Alındı!</p>
            <div className="w-full bg-black h-1 mb-4 rounded-full" style={{ width: `300%` }}></div>
            <p class="font-semibold">Bize Gönderiğiniz Formun Özeti;</p>
            <p>● Ad Soyad: {formData.name}</p>
            <p>● Yaş: {formData.age}</p>
            <p>● Meslek: {formData.job}</p>
            <p>● Bizi Nereden Duyduğunuz: {formData.about}</p>
            <p>● Düşünceleriniz: {formData.opinion}</p>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
