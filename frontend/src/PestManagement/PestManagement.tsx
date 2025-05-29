import { useEffect, useState } from "react";
import axios from "axios";
import "../PestManagement/PestManagement.css";
import image1 from "../Image/Insecticidal Soap.jpeg";
import image2 from "../Image/neem.jpeg";
import image3 from "../Image/Diatomaceous Earth.jpeg";
import image4 from "../Image/Pyrethrin.jpeg";
import image5 from "../Image/Bacillus thuringiensis (Bt).jpeg";
import image6 from "../Image/Horticultural Oil.jpeg";
import image7 from "../Image/Beneficial Insects.jpeg";
import image8 from "../Image/Nematodes.webp";
import image11 from "../Image/Biological Control.jpg";
import image12 from "../Image/Cultural Control.jpeg";
import image13 from "../Image/Physical Control.jpeg";
import image14 from "../Image/Chemical Control.webp";
import image15 from "../Image/Genetic Control.jpeg";
import image16 from "../Image/Integrated Pest Management (IPM)- .jpeg";
import { MouseEventHandler } from "react";
import Navbar from "@/Component/Navbar";
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import Footer from "@/Component/Footer";


function Pestmanagement() {
  const [animal1, setanimal1] = useState<boolean>(false);
  const [animal2, setanimal2] = useState<boolean>(false);
  const [animal3, setanimal3] = useState<boolean>(false);
  const [animal4, setanimal4] = useState<boolean>(false);
  const [animal5, setanimal5] = useState<boolean>(false);
  const [animal6, setanimal6] = useState<boolean>(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const text = "";
  const mutateSomething = useMutation(api.myFunctions.pestrecommendation);
  const mutateSomething1 = useMutation(api.myFunctions.upsertSensorData);
  const d2 = useQuery(api.myFunctions.fetchpestrecommendation, {
    email: user?.primaryEmailAddressId || 'Unknown'
  });


  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://api.agrisense.online:5100/pest", {
        prompt: text,
      });
      const responseText = res.data.text;

      const cleanedResponse = responseText.replace(/\*/g, '');


      if (!isLoaded) {
        return;
      }

      if (isSignedIn && user) {
        try {
          await mutateSomething({
            name: user.fullName || 'Unknown',
            email: user.primaryEmailAddressId || 'Unknown',
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


  useEffect(() => {
    try {
      mutateSomething1({
        device_id: "device_123",
        current_time: "2024-09-17T10:15:00Z",
        current_humidity: 55.2,
        current_light_intensity: 800,
        current_soil_moisture: 35.6,
        current_temperature: 22.5,
        current_wind_speed: 12.7,
        current_nitrogen: 40,
        current_phosphorus: 25,
        current_potassium: 30,
        current_water_level: 65.3,
        latitude: 37.7749,
        longitude: -122.4194,
        fire_status: "1",
        gas_status: "0",
        ph_value: "6.8",
        irrigation: "0",
        irrigation_time: "2024-09-17T10:15:00Z",
        previous_time: "2024-09-17T09:00:00Z",
        previous_humidity: 53.1,
        previous_light_intensity: 750,
        previous_soil_moisture: 34.8,
        previous_temperature: 21.8,
        previous_wind_speed: 11.9,
        previous_nitrogen: 39,
        previous_phosphorus: 24,
        previous_potassium: 29,
        previous_water_level: 64.8,
        previous1_time: "2024-09-17T08:00:00Z",
        previous1_humidity: 52.4,
        previous1_light_intensity: 720,
        previous1_soil_moisture: 34.2,
        previous1_temperature: 21.5,
        previous1_wind_speed: 11.4,
        previous1_nitrogen: 38,
        previous1_phosphorus: 23,
        previous1_potassium: 28,
        previous1_water_level: 64.1,
        previous2_time: "2024-09-17T07:00:00Z",
        previous2_humidity: 51.7,
        previous2_light_intensity: 700,
        previous2_soil_moisture: 33.7,
        previous2_temperature: 21.2,
        previous2_wind_speed: 10.9,
        previous2_nitrogen: 37,
        previous2_phosphorus: 22,
        previous2_potassium: 27,
        previous2_water_level: 63.6,
        previous3_time: "2024-09-17T06:00:00Z",
        previous3_humidity: 51.0,
        previous3_light_intensity: 690,
        previous3_soil_moisture: 33.4,
        previous3_temperature: 21.0,
        previous3_wind_speed: 10.5,
        previous3_nitrogen: 36,
        previous3_phosphorus: 21,
        previous3_potassium: 26,
        previous3_water_level: 63.0,
        previous4_time: "2024-09-17T05:00:00Z",
        previous4_humidity: 50.2,
        previous4_light_intensity: 680,
        previous4_soil_moisture: 33.0,
        previous4_temperature: 20.8,
        previous4_wind_speed: 10.2,
        previous4_nitrogen: 35,
        previous4_phosphorus: 20,
        previous4_potassium: 25,
        previous4_water_level: 62.5,
        previous5_time: "2024-09-17T04:00:00Z",
        previous5_humidity: 49.5,
        previous5_light_intensity: 670,
        previous5_soil_moisture: 32.6,
        previous5_temperature: 20.5,
        previous5_wind_speed: 9.9,
        previous5_nitrogen: 34,
        previous5_phosphorus: 19,
        previous5_potassium: 24,
        previous5_water_level: 62.0
      })
      console.log('User added to database successfully');
    } catch (error) {
      console.error('Error adding user to database:', error);
    }
  })

  return (
    <div>
      <Navbar />
      <div className="animal1">
        <div className="animal2">
          <h1>Pest Detection</h1>
          <p>Safeguard your crops with precision</p>
          <div className="animal3"></div>
        </div>
      </div>

      <div className="crop6">
        <div className="crop7">
          <h1>Our Ai Recommendation</h1>
          <p>Click on the below button to get the recommendation.</p>
        </div>
      </div>

      <div className="crop21">
        <div className="crop22" style={{ whiteSpace: 'pre-line' }}>
          {/* {cleanedResponse ? <p>{cleanedResponse}</p> : <p>Please Click the button below to get your pest control recommendation</p>} */}
          <p>{d2}</p>
        </div>
        <button onClick={handleSubmit}>Get your recommendation</button>
      </div>


      <div className="animal1" style={{ marginBottom: '0' }}>
        <div className="animal2" style={{ marginBottom: "0" }}>
          <h1 style={{ marginBottom: "0" }}>Pest Control</h1>
          <p style={{ marginBottom: "0" }}>Safeguard your crops with this products</p>
        </div>
      </div>

      <div className="pest1" style={{ marginTop: '0' }}>
        <div className="pest2">
          <div className="pest3">
            <div className="pest4">
              <img src={image1} width="100%" height="100%" />
            </div>
            <h3>Insecticidal Soap</h3>
            <p>
              Effective against soft-bodied insects like aphids, spider mites,
              and whiteflies. Use according to label instructions, usually by
              spraying directly on the pests.
            </p>
          </div>
          <div className="pest3">
            <div className="pest4">
              <img src={image2} width="100%" height="100%" />
            </div>
            <h3>Neem Oil</h3>
            <p>
              Natural insecticide and fungicide that controls a wide range of
              pests and diseases. Dilute with water and spray on affected
              plants, targeting both pests and fungal issues.
            </p>
          </div>
          <div className="pest3">
            <div className="pest4">
              <img src={image3} width="100%" height="100%" />
            </div>
            <h3>Diatomaceous Earth</h3>
            <p>
              Non-toxic powder that kills insects by absorbing oils and fats
              from the cuticle, causing dehydration. Sprinkle a thin layer on
              plant surfaces or around the base of plants.
            </p>
          </div>
          <div className="pest3">
            <div className="pest4">
              <img src={image4} width="100%" height="100%" />
            </div>
            <h3>Pyrethrin</h3>
            <p>
              Derived from chrysanthemum flowers, it's a natural insecticide
              effective against a variety of insects. Mix with water and spray
              on plants, targeting pests directly.
            </p>
          </div>
          <div className="pest3">
            <div className="pest4">
              <img src={image5} width="100%" height="100%" />
            </div>
            <h3>Bacillus thuringiensis (Bt)</h3>
            <p>
              Bacterial insecticide that targets specific pests like
              caterpillars and mosquito larvae. Mix with water and spray on
              plants, especially on the undersides of leaves.
            </p>
          </div>
          <div className="pest3">
            <div className="pest4">
              <img src={image6} width="100%" height="100%" />
            </div>
            <h3>Horticultural Oil</h3>
            <p>
              Used to suffocate insects and their eggs, effective against
              scales, mites, and aphids. Dilute according to instructions and
              spray on affected plants.
            </p>
          </div>
          <div className="pest3">
            <div className="pest4">
              <img src={image7} width="100%" height="100%" />
            </div>
            <h3>Beneficial Insects</h3>
            <p>
              Ladybugs, lacewings, and predatory mites can be introduced to
              control pest populations naturally. Release these insects near
              affected plants.
            </p>
          </div>
          <div className="pest3">
            <div className="pest4">
              <img src={image8} width="100%" height="100%" />
            </div>
            <h3>Nematodes</h3>
            <p>
              Microscopic organisms that target soil-dwelling pests like grubs,
              weevils, and larvae. Mix with water and apply to the soil around
              affected plants.
            </p>
          </div>
          {/* <div className='pest3'>
                        <div className='pest4'>
                            <img src={image9} width='100%' height='100%' />
                        </div>
                        <h3>Botanical Insecticides</h3>
                        <p>Extracts from plants like pyrethrum, rotenone, and sabadilla can be used to control pests. Follow label instructions for dilution and application.</p>
                    </div> */}
        </div>
      </div>

      <div className="pest5">
        <div className="pest6">
          <h1>Pest Management</h1>
          <p
            style={{
              marginTop: "0",
              marginBottom: "2%",
              fontSize: "17px",
              color: "rgb(46, 141, 78)",
              fontWeight: '300',
            }}
          >
            Here you will understand about the various concept of pest
            management
          </p>

          <div className="pest7">
            <div className="pest8 pest9">
              <span style={{ color: "black" }}>Biological Control: </span>{" "}
              <span>
                Using natural predators, parasites, or pathogens to control pest
                populations. For example, introducing ladybugs to control
                aphids.
              </span>
              {animal1 ? (
                <p>
                  Biological control is a method of pest management that uses
                  natural predators, parasites, or pathogens to control pest
                  populations. This approach relies on the natural enemies of
                  pests to reduce their numbers and minimize damage to crops or
                  other organisms. Biological control is often used as an
                  alternative to chemical pesticides, as it is more
                  environmentally friendly and sustainable.<br></br>
                  <br></br>
                  <div className="pest12">
                    There are several types of biological control:<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Predation:
                    </span>{" "}
                    Predators are organisms that consume pests. For example,
                    ladybugs feed on aphids, and spiders feed on various insect
                    pests. Predatory insects can be released into a crop to
                    control pest populations.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      2.Parasitism:
                    </span>{" "}
                    Parasitoids are organisms that lay eggs inside or on a host
                    organism, eventually killing the host. For example, certain
                    wasp species lay eggs in caterpillars, and the developing
                    wasp larvae consume the caterpillar from the inside.
                    <br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      3.Pathogens:
                    </span>{" "}
                    Pathogens are microorganisms that cause diseases in pests.
                    For example, certain fungi, bacteria, and viruses can infect
                    and kill pest insects. These pathogens can be applied to
                    crops as biopesticides to control pest populations.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      4.Allelopathy:
                    </span>{" "}
                    Some plants release chemicals that inhibit the growth of
                    other plants or pests. This can be used as a form of
                    biological control by planting certain crops that repel
                    pests or inhibit their growth.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      5.Augmentation:
                    </span>{" "}
                    In some cases, natural enemies of pests are not present in
                    sufficient numbers to provide effective control. In these
                    cases, natural enemies can be bred and released in large
                    numbers to supplement existing populations.<br></br>
                    <br></br>
                  </div>
                  Biological control is an important component of integrated
                  pest management (IPM), which aims to control pests using a
                  combination of strategies to minimize environmental impact and
                  maximize effectiveness. Biological control can be highly
                  effective when used correctly and can help reduce the reliance
                  on chemical pesticides.
                </p>
              ) : (
                <p>
                  Biological control is a method of pest management that uses
                  natural predators, parasites, or pathogens to control pest
                  populations. This approach relies on the natural enemies of
                  pests to reduce their numbers and minimize damage to crops or
                  other organisms. Biological control is often used as an
                  alternative to chemical pesticides, as it is more
                  environmentally friendly and sustainable.<br></br>
                  <br></br>
                  <div className="pest12">
                    There are several types of biological control:<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Predation:
                    </span>{" "}
                    Predators are organisms that consume pests. For example,
                    ladybugs feed on aphids, and spiders feed on various insect
                    pests. Predatory insects can be released into a crop to
                    control pest populations.<br></br>
                    <br></br>
                  </div>
                </p>
              )}
              <button type="button" onClick={() => setanimal1(true)}>
                View More
              </button>
            </div>
            <div className="pest8 pest10">
              <div className="pest11">
                <img src={image11} width="100%" />
              </div>
            </div>
          </div>

          <div className="pest7">
            <div className="pest8 pest9">
              <span style={{ color: "black" }}>Cultural Control: </span>{" "}
              <span>
                Modifying the environment or practices to reduce pest
                populations. This can include crop rotation, planting resistant
                varieties, and maintaining proper sanitation.
              </span>
              {animal2 ? (
                <p>
                  Cultural control is a method of pest management that involves
                  modifying the environment or agricultural practices to reduce
                  pest populations. This approach focuses on preventing pest
                  infestations rather than relying on pesticides or other
                  chemical treatments. Here are some common cultural control
                  practices:<br></br>
                  <br></br>
                  <div className="pest12">
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Crop Rotation:
                    </span>{" "}
                    Planting different crops in a field each year can help
                    disrupt pest life cycles and reduce the buildup of pest
                    populations. Rotating crops can also help maintain soil
                    health and fertility.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      2.Planting Resistant Varieties:
                    </span>{" "}
                    Choosing plant varieties that are naturally resistant to
                    pests can reduce the need for chemical pesticides. Resistant
                    varieties have traits that make them less susceptible to
                    pest damage.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      3.Sanitation:
                    </span>{" "}
                    Keeping fields, gardens, and orchards free of weeds, debris,
                    and crop residues can help reduce pest habitats and breeding
                    grounds. Proper sanitation practices can also help prevent
                    the spread of diseases.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      4.Timing of Planting:
                    </span>{" "}
                    Planting crops at the right time can help avoid peak pest
                    seasons. For example, planting crops after the peak
                    population of a particular pest has passed can reduce pest
                    pressure.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      5.Crop Diversity:
                    </span>{" "}
                    Planting a variety of crops in close proximity can help
                    deter pests that prefer a single type of plant. This
                    practice can also promote beneficial insects that prey on
                    pests.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      6.Soil Management:
                    </span>{" "}
                    Proper soil management practices, such as maintaining soil
                    fertility and structure, can help promote healthy plant
                    growth and reduce susceptibility to pests.<br></br>
                    <br></br>
                  </div>
                  By implementing these cultural control practices, farmers and
                  gardeners can effectively manage pest populations while
                  reducing the reliance on chemical pesticides.
                </p>
              ) : (
                <p>
                  Cultural control is a method of pest management that involves
                  modifying the environment or agricultural practices to reduce
                  pest populations. This approach focuses on preventing pest
                  infestations rather than relying on pesticides or other
                  chemical treatments. Here are some common cultural control
                  practices:<br></br>
                  <br></br>
                  <div className="pest12">
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Crop Rotation:
                    </span>{" "}
                    Planting different crops in a field each year can help
                    disrupt pest life cycles and reduce the buildup of pest
                    populations. Rotating crops can also help maintain soil
                    health and fertility.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      2.Planting Resistant Varieties:
                    </span>{" "}
                    Choosing plant varieties that are naturally resistant to
                    pests can reduce the need for chemical pesticides. Resistant
                    varieties have traits that make them less susceptible to
                    pest damage.<br></br>
                    <br></br>
                  </div>
                </p>
              )}
              <button type="button" onClick={() => setanimal2(true)}>
                View More
              </button>
            </div>
            <div className="pest8 pest10">
              <div className="pest11">
                <img src={image12} width="100%" />
              </div>
            </div>
          </div>

          <div className="pest7">
            <div className="pest8 pest9">
              <span style={{ color: "black" }}>
                Mechanical/Physical Control:{" "}
              </span>{" "}
              <span>
                Using physical barriers, traps, or manual removal to control
                pests. Examples include using row covers to protect plants from
                insects or handpicking pests off plants.
              </span>
              {animal3 ? (
                <p>
                  Mechanical or physical control methods are effective for
                  managing pests without using chemical pesticides. Here are
                  some solutions:<br></br>
                  <br></br>
                  <div className="pest12">
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Row Covers:
                    </span>{" "}
                    Use row covers made of lightweight fabric to physically
                    prevent pests from reaching plants. This method is effective
                    for protecting plants from flying insects like aphids and
                    cabbage moths.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      2.Handpicking:
                    </span>{" "}
                    Regularly inspect plants and manually remove pests such as
                    caterpillars, beetles, and snails. This method is
                    labor-intensive but can be very effective for small-scale
                    infestations.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      3.Traps:
                    </span>{" "}
                    Set up traps to capture and kill pests. For example, yellow
                    sticky traps attract and trap flying insects like whiteflies
                    and aphids.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      4.Barriers:
                    </span>{" "}
                    Create physical barriers around plants to prevent pests from
                    accessing them. For example, copper tape can deter slugs and
                    snails, while diatomaceous earth can create a barrier
                    against crawling insects.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      5.Mulching:
                    </span>{" "}
                    Use organic mulches like straw or wood chips to cover the
                    soil around plants. This can help deter pests and improve
                    soil health.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      6.Companion Planting:
                    </span>{" "}
                    Planting certain crops together can help repel pests. For
                    example, marigolds can deter nematodes, while basil can
                    repel mosquitoes and flies.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      7.Pruning:
                    </span>{" "}
                    Regular pruning of plants can help remove pest-infested
                    parts and improve air circulation, reducing the risk of
                    fungal diseases.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      8.Mechanical Traps:
                    </span>{" "}
                    Install physical traps such as pheromone traps or light
                    traps to capture specific types of pests.<br></br>
                    <br></br>
                  </div>
                  These mechanical and physical control methods can be effective
                  in managing pest populations without the use of chemical
                  pesticides, but they may require more effort and monitoring
                  compared to chemical methods.
                </p>
              ) : (
                <p>
                  Mechanical or physical control methods are effective for
                  managing pests without using chemical pesticides. Here are
                  some solutions:<br></br>
                  <br></br>
                  <div className="pest12">
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Row Covers:
                    </span>{" "}
                    Use row covers made of lightweight fabric to physically
                    prevent pests from reaching plants. This method is effective
                    for protecting plants from flying insects like aphids and
                    cabbage moths.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      2.Handpicking:
                    </span>{" "}
                    Regularly inspect plants and manually remove pests such as
                    caterpillars, beetles, and snails. This method is
                    labor-intensive but can be very effective for small-scale
                    infestations.<br></br>
                    <br></br>
                  </div>
                </p>
              )}
              <button type="button" onClick={() => setanimal3(true)}>
                View More
              </button>
            </div>
            <div className="pest8 pest10">
              <div className="pest11">
                <img src={image13} width="100%" />
              </div>
            </div>
          </div>

          <div className="pest7">
            <div className="pest8 pest9">
              <span style={{ color: "black" }}>Chemical Control: </span>{" "}
              <span>
                Using pesticides to control pest populations. This is often used
                as a last resort and should be done following label instructions
                and considering environmental impact.
              </span>
              {animal4 ? (
                <p>
                  Chemical control, or the use of pesticides, should be
                  considered as a last resort in pest management due to its
                  potential environmental and health impacts. However, when
                  necessary, here are some key considerations for using
                  pesticides effectively and responsibly:<br></br>
                  <br></br>
                  <div className="pest12">
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Identify the Pest:
                    </span>{" "}
                    Properly identify the pest species and understand its
                    lifecycle and behavior to choose the most appropriate
                    pesticide.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      2.Select the Right Pesticide:
                    </span>{" "}
                    Choose a pesticide that is labeled for the target pest and
                    suitable for the application method (e.g., spray, dust,
                    bait).<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      3.Read and Follow Label Instructions:
                    </span>{" "}
                    Carefully read and follow the label instructions, including
                    dosage, application method, and safety precautions.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      4.Use Personal Protective Equipment (PPE):
                    </span>{" "}
                    Wear appropriate PPE, such as gloves, goggles, and a mask,
                    when handling or applying pesticides.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      5.Apply Correctly:
                    </span>{" "}
                    Apply pesticides at the correct time, in the correct
                    concentration, and using the correct application method to
                    maximize effectiveness and minimize environmental impact.
                    <br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      6.Consider Environmental Impact:
                    </span>{" "}
                    Avoid spraying pesticides during windy conditions to prevent
                    drift, and avoid applying near water sources or on flowering
                    plants to protect pollinators.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      7.Monitor and Evaluate:
                    </span>{" "}
                    Monitor the effectiveness of pesticide application and
                    reapply as necessary. Evaluate the impact on non-target
                    organisms and the environment.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      8.Integrated Pest Management (IPM):
                    </span>{" "}
                    Integrate chemical control with other pest management
                    strategies as part of an IPM approach to reduce reliance on
                    pesticides.<br></br>
                    <br></br>
                  </div>
                  By following these guidelines, chemical control can be used
                  effectively and responsibly as part of a comprehensive pest
                  management strategy.
                </p>
              ) : (
                <p>
                  Chemical control, or the use of pesticides, should be
                  considered as a last resort in pest management due to its
                  potential environmental and health impacts. However, when
                  necessary, here are some key considerations for using
                  pesticides effectively and responsibly:<br></br>
                  <br></br>
                  <div className="pest12">
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Identify the Pest:
                    </span>{" "}
                    Properly identify the pest species and understand its
                    lifecycle and behavior to choose the most appropriate
                    pesticide.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      2.Select the Right Pesticide:
                    </span>{" "}
                    Choose a pesticide that is labeled for the target pest and
                    suitable for the application method (e.g., spray, dust,
                    bait).<br></br>
                    <br></br>
                  </div>
                </p>
              )}
              <button type="button" onClick={() => setanimal4(true)}>
                View More
              </button>
            </div>
            <div className="pest8 pest10">
              <div className="pest11">
                <img src={image14} width="100%" />
              </div>
            </div>
          </div>

          <div className="pest7">
            <div className="pest8 pest9">
              <span style={{ color: "black" }}>Genetic Control: </span>{" "}
              <span>
                Using genetic techniques to control pest populations. This can
                include releasing sterile insects or using genetically modified
                organisms (GMOs) to control pests.
              </span>
              {animal5 ? (
                <p>
                  Genetic control methods can be effective in managing pest
                  populations in a targeted and environmentally friendly manner.
                  Here are some key approaches:<br></br>
                  <br></br>
                  <div className="pest12">
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Sterile Insect Technique (SIT):
                    </span>{" "}
                    This method involves rearing and sterilizing male insects
                    using radiation. The sterile males are then released into
                    the wild to mate with wild females. Since the females do not
                    produce viable offspring, the overall pest population
                    decreases over time.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      2.Genetic Modification:
                    </span>{" "}
                    Genetic engineering can be used to create genetically
                    modified organisms (GMOs) that have characteristics to
                    control pests. For example, crops can be modified to produce
                    toxins that are harmful to specific pests but safe for other
                    organisms.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      3.Cytoplasmic Incompatibility (CI):
                    </span>{" "}
                    This method involves introducing a Wolbachia bacterium into
                    pest populations. The bacterium causes reproductive
                    abnormalities, leading to a reduction in pest populations
                    over time.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      4.Gene Drive Technology:
                    </span>{" "}
                    Gene drive systems can be used to spread desired genetic
                    traits through a population rapidly. This technology has the
                    potential to control pest populations by spreading genes
                    that reduce fertility or increase susceptibility to certain
                    control measures.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      5.RNA Interference (RNAi):
                    </span>{" "}
                    RNAi can be used to silence specific genes in pests, leading
                    to their death or reduced reproductive capacity. This
                    approach is being researched for its potential use in pest
                    control.<br></br>
                    <br></br>
                  </div>
                  These genetic control methods can be effective tools in
                  integrated pest management strategies. However, careful
                  consideration must be given to the potential ecological and
                  regulatory implications of releasing genetically modified
                  organisms into the environment.
                </p>
              ) : (
                <p>
                  Genetic control methods can be effective in managing pest
                  populations in a targeted and environmentally friendly manner.
                  Here are some key approaches:<br></br>
                  <br></br>
                  <div className="pest12">
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Sterile Insect Technique (SIT):
                    </span>{" "}
                    This method involves rearing and sterilizing male insects
                    using radiation. The sterile males are then released into
                    the wild to mate with wild females. Since the females do not
                    produce viable offspring, the overall pest population
                    decreases over time.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      2.Genetic Modification:
                    </span>{" "}
                    Genetic engineering can be used to create genetically
                    modified organisms (GMOs) that have characteristics to
                    control pests. For example, crops can be modified to produce
                    toxins that are harmful to specific pests but safe for other
                    organisms.<br></br>
                    <br></br>
                  </div>
                </p>
              )}
              <button type="button" onClick={() => setanimal5(true)}>
                View More
              </button>
            </div>
            <div className="pest8 pest10">
              <div className="pest11">
                <img src={image15} width="100%" />
              </div>
            </div>
          </div>

          <div className="pest7">
            <div className="pest8 pest9">
              <span style={{ color: "black" }}>
                Integrated Pest Management (IPM):{" "}
              </span>{" "}
              <span>
                A holistic approach that combines multiple pest management
                strategies to control pests effectively while minimizing
                environmental impact. IPM emphasizes monitoring, prevention, and
                using the least harmful methods first.
              </span>
              {animal6 ? (
                <p>
                  Integrated Pest Management (IPM) is a comprehensive approach
                  to pest management that aims to control pests effectively
                  while minimizing environmental impact. Here are the key
                  components of an IPM program:<br></br>
                  <br></br>
                  <div className="pest12">
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Monitoring and Identification:
                    </span>{" "}
                    Regular monitoring of pest populations and identification of
                    pest species to determine the extent of the infestation and
                    the best control methods.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      2.Prevention:
                    </span>{" "}
                    Implementing practices to prevent pest infestations, such as
                    using pest-resistant plant varieties, practicing good
                    sanitation, and properly storing food and other items.
                    <br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      3.Cultural Controls:
                    </span>{" "}
                    Modifying the environment or cultural practices to reduce
                    pest populations, such as planting trap crops, rotating
                    crops, and using mulches.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      4.Mechanical and Physical Controls:
                    </span>{" "}
                    Using physical barriers, traps, or manual removal to control
                    pests, such as using row covers, sticky traps, and
                    handpicking.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      5.Biological Controls:
                    </span>{" "}
                    Using natural enemies of pests, such as predators,
                    parasites, and pathogens, to control pest populations.
                    <br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      6.Chemical Controls:
                    </span>{" "}
                    Using pesticides only when necessary and choosing the least
                    toxic options. Pesticides should be applied according to
                    label instructions and with consideration for their impact
                    on non-target organisms.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      7.Evaluation and Adjustment:
                    </span>{" "}
                    Regularly evaluating the effectiveness of pest management
                    strategies and adjusting them as needed based on monitoring
                    results.<br></br>
                    <br></br>
                  </div>
                  By integrating these various pest management strategies, IPM
                  can effectively control pests while reducing reliance on
                  chemical pesticides and minimizing environmental impact..
                </p>
              ) : (
                <p>
                  Integrated Pest Management (IPM) is a comprehensive approach
                  to pest management that aims to control pests effectively
                  while minimizing environmental impact. Here are the key
                  components of an IPM program:<br></br>
                  <br></br>
                  <div className="pest12">
                    <span style={{ color: "black", fontWeight: "600" }}>
                      1.Monitoring and Identification:
                    </span>{" "}
                    Regular monitoring of pest populations and identification of
                    pest species to determine the extent of the infestation and
                    the best control methods.<br></br>
                    <br></br>
                    <span style={{ color: "black", fontWeight: "600" }}>
                      2.Prevention:
                    </span>{" "}
                    Implementing practices to prevent pest infestations, such as
                    using pest-resistant plant varieties, practicing good
                    sanitation, and properly storing food and other items.
                    <br></br>
                    <br></br>
                  </div>
                </p>
              )}
              <button type="button" onClick={() => setanimal6(true)}>
                View More
              </button>
            </div>
            <div className="pest8 pest10">
              <div className="pest11">
                <img src={image16} width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pestmanagement;

