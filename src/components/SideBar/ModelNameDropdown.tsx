import React, { useState, useEffect, useContext } from "react";
import {
  getModelsInfo as getModelsInfoFromStorage,
  saveModelsInfo as saveModelsInfoStorage,
} from "../../utils/db";
import {
  DEFAULT_MODEL_NAME,
  ModelInfo,
  getAvailableModels as getAvailableModelsAPI,
} from "../../utils/api";
import { AuthenticationContext } from "../../auth/authentication.context";
import { RedditCircleFilled } from "@ant-design/icons";

interface ModelDropdownProps {
  setModelName: (modelName: string) => void;
}

export const ModelNameDropdown: React.FC<ModelDropdownProps> = ({
  setModelName,
}) => {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [selectedModelId, setSelectedModelId] =
    useState<string>(DEFAULT_MODEL_NAME);

  const { user } = useContext(AuthenticationContext);

  const fetchAndSaveModels = async () => {
    const fetchedModels = await getAvailableModelsAPI({
      apiKey: user!.apiKey,
      overrideDev: true,
    });
    saveModelsInfoStorage(fetchedModels);
    return fetchedModels;
  };

  useEffect(() => {
    // Fetch the list of model names from the API and cache them in the state.
    // Make sure to handle any error cases appropriately.
    const fetchModels = async () => {
      let fetchedModels = await getModelsInfoFromStorage();
      if (fetchedModels.length === 0) {
        console.log("fetching and saving");
        fetchedModels = await fetchAndSaveModels();
      } else {
        console.log("Obtained from storage " + fetchedModels.length);
      }
      setModels(fetchedModels);
    };

    fetchModels()
      .then((a) => a)
      .catch((e) =>
        console.error("Error fetching models\n" + JSON.stringify(e, null, 2))
      );
  }, []);

  const handleRefresh = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Refreshing models...");
    const response = fetchAndSaveModels()
      .then((m) => {
        setModels(m);
      })
      .catch((e) => {
        console.error("Error refreshind models\n" + JSON.stringify(e, null, 2));
      });
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedModelId(selectedId);
    setModelName(selectedId);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <select
        value={selectedModelId}
        onChange={handleModelChange}
        style={{ minWidth: "80%" }}
      >
        <option value="">Select a model</option>
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.id}
          </option>
        ))}
      </select>
      <button
        style={{ maxWidth: "10%", maxHeight: "10%", marginLeft: "5%" }}
        onClick={handleRefresh}
      >
        <RedditCircleFilled size={10} />
      </button>
    </div>
  );
};
