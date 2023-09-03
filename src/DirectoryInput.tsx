import AppContext from "./AppContext";
import { useContext } from "react";
import InputWithButtons from "./InputWithButtons";
import { useSettings } from "./hooks/useSettings";
import { useEffect } from "react";

export default function Settings() {
  const { settings, setSettings } = useContext(AppContext);
  const { directory, setDirectory } = useContext(AppContext);
  const { tempDirectory, setTempDirectory } = useContext(AppContext);

  useSettings(settings, setSettings);

  useEffect(() => {
    let hasScanPath = false;
    let hasTempPath = false;

    settings.forEach((setting: any) => {
      if (setting.key === "scan_path") {
        setDirectory(setting.value);
        hasScanPath = true;
      }
      if (setting.key === "temp_path") {
        setTempDirectory(setting.value);
        hasTempPath = true;
      }
    });

    if (!hasScanPath) {
      setDirectory("");
    }

    if (!hasTempPath) {
      setTempDirectory("");
    }
  }, [settings]);

  const handleOnChange = (
    newValue: string,
    setter: (value: string) => void
  ) => {
    setter(newValue);
  };

  const handleOnDirectoryChange = async (key: string, value: string) => {
    const updatedSettings = settings.filter((s) => s.key !== key);
    setSettings(updatedSettings);

    const existingSetting = settings.find((s) => s.key === key);
    if (!existingSetting) {
      const updatedSettings = [...settings, { key: key, value: value }];
      setSettings(updatedSettings);
    } else {
      const updatedSettings = settings.map((s) =>
        s.key === key ? { ...s, value } : s
      );
      setSettings(updatedSettings);
    }
  };

  const handleClearDirectory = (key: string) => {
    const updatedSettings = settings.filter((s) => s.key !== key);
    setSettings(updatedSettings);
  };

  return (
    <div>
      <InputWithButtons
        label="Media path"
        value={directory}
        onChange={(e) => handleOnChange(e.target.value, setDirectory)}
        onPrimaryClick={() => handleOnDirectoryChange("scan_path", directory)}
        onSecondaryClick={() => handleClearDirectory("scan_path")}
        isDisabled={!directory.trim()}
      />
      <InputWithButtons
        label="Temp files path"
        value={tempDirectory}
        onChange={(e) => handleOnChange(e.target.value, setTempDirectory)}
        onPrimaryClick={() =>
          handleOnDirectoryChange("temp_path", tempDirectory)
        }
        onSecondaryClick={() => handleClearDirectory("temp_path")}
        isDisabled={!tempDirectory.trim()}
      />
    </div>
  );
}
