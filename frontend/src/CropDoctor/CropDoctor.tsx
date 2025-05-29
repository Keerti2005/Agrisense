import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "../CropDoctor/CropDoctor.css";
import Navbar from "@/Component/Navbar";
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import Footer from "@/Component/Footer";

interface DiseaseResponseData {
  text: string;
}

interface FertilizerResponseData {
  text: string;
}

function CropDoctor() {
  const [cropName, setCropName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [fertilizerType, setFertilizerType] = useState<string>("Natural");
  const [cleanedDiseaseResponse, setCleanedDiseaseResponse] = useState<string>("");
  // const [cleanedFertilizerResponse, setCleanedFertilizerResponse] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const mutateSomething = useMutation(api.myFunctions.fertlizerrecommendation);
  const { isSignedIn, user, isLoaded } = useUser();
  const d2 = useQuery(api.myFunctions.fetchfertrecommendation, {
    email: user?.primaryEmailAddressId || 'Unknown'
  });  

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      setImagePreviewUrl(URL.createObjectURL(uploadedFile));
    }
  };

  const handleDiseaseSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post<DiseaseResponseData>("https://api.agrisense.online:5100/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseText = res.data.text;
      const cleanedRes = responseText
        .split("\n")
        .map((paragraph) => paragraph.replace(/\*/g, ""))
        .join("\n");
      setCleanedDiseaseResponse(cleanedRes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFertilizerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedResponse = `Crop Name: ${cropName}, Desired Price: ${price}, Fertilizer Type: ${fertilizerType}`;

    try {
      const res = await axios.post<FertilizerResponseData>("https://api.agrisense.online:5100/cropfertilizer", {
        prompt: formattedResponse,
      });
      const responseText = res.data.text;

      const cleanedResponse = responseText.replace(/\*/g, "");
      // setCleanedFertilizerResponse(cleanedResponse);

      if (!isLoaded) {
        return;
      }

      if (isSignedIn && user) {
        try {
          await mutateSomething({
            name: user.fullName || 'Unknown',
            email: user.primaryEmailAddressId || 'Unknown',
            cropname: cropName,
            price: price,
            type: fertilizerType,
            output: cleanedResponse,
          });
          console.log('User added to database successfully');
        } catch (error) {
          console.error('Error adding user to database:', error);
        }
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="crop6">
        <div className="crop7">
          <h1>Crop Disease Detection</h1>
          <p>Get to know about your crop disease</p>
        </div>
      </div>

      <div className="crop21">
        <form onSubmit={handleDiseaseSubmit}>
          <div className="crop22">
            <input type="file" onChange={handleFileChange} required />
          </div>
          {imagePreviewUrl && (
            <div className="crop22" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '2%' }}>
              <img src={imagePreviewUrl} alt="Uploaded preview" style={{ width: "20%", height: "20%", objectFit: "cover" }} />
            </div>
          )}

          <button type="submit" style={{ marginBottom: "3%" }}>
            Know about your crop disease
          </button>
        </form>
        <div className="crop22" style={{ whiteSpace: 'pre-line' }}>
          {cleanedDiseaseResponse ? (
            <p>{cleanedDiseaseResponse}</p>
          ) : (
            <p>
              Please upload a file and click the button above to get your crop
              disease recommendation
            </p>
          )}
        </div>
      </div>

      <div className="crop6">
        <div className="crop7">
          <h1>Fertilizer Recommendation</h1>
          <p>Get to know about your fertilizer</p>
        </div>
      </div>

      <div className="crop21" style={{ marginBottom: '5%' }}>
        <form onSubmit={handleFertilizerSubmit}>
          <div className="crop40">
            <div className="crop41">
              <p>Crop Name</p>
              <input
                type="text"
                placeholder="Enter Crop Name"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                required
              />
            </div>
            <div className="crop41">
              <p>Desired Price</p>
              <input
                type="text"
                placeholder="Enter your desired price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="crop40">
            <div className="crop41">
              <p>Fertilizer Type</p>
              <select
                name="fertilizerType"
                id="fertilizerType"
                value={fertilizerType}
                onChange={(e) => setFertilizerType(e.target.value)}
                style={{ marginBottom: "0%" }}
              >
                <option value="Natural">Natural</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <button type="submit" style={{ marginBottom: "2%" }}>
            Get your Fertilizer Recommendation
          </button>
        </form>
        <div className="crop22" style={{ whiteSpace: 'pre-line' }}>
          {/* {cleanedFertilizerResponse ? (
            <p>{cleanedFertilizerResponse}</p>
          ) : (
            <p>
              Please fill out the form above and click the button to get your
              fertilizer recommendation. All recommendations are based on collected real-time data.
            </p>
          )} */}
          <p>{d2}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CropDoctor;
