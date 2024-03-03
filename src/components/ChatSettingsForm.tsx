import React, {useState, ChangeEvent, useEffect, useContext} from 'react';
import AvatarFieldEditor, { ImageSource } from "./AvatarFieldEditor";
import 'rc-slider/assets/index.css';
import ModelSelect from './ModelSelect';
import { toast } from "react-toastify";
import TemperatureSlider from './TemperatureSlider';
import TopPSlider from './TopPSlider';
import { ChatSettings } from '../models/ChatSettings';
import { EditableField } from './EditableField';
import {useTranslation} from 'react-i18next';
import {UserContext} from "../UserContext";

interface ChatSettingsFormProps {
  chatSettings?: ChatSettings;
  readOnly?: boolean;
}

const DUMMY_CHAT_SETTINGS: ChatSettings = {
  id: Date.now(),
  author: 'user',
  icon: null,
  name: '',
  description: '',
  instructions: 'You are a helpful assistant.',
  model: null,
  seed: null,
  temperature: null,
  top_p: null
};

const ChatSettingsForm: React.FC<ChatSettingsFormProps> = ({ chatSettings, readOnly = false }) => {
  const { userSettings, setUserSettings } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ChatSettings>(chatSettings || DUMMY_CHAT_SETTINGS);
  const {t} = useTranslation();

  useEffect(() => {
    error && toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: ((userSettings.theme && userSettings.theme === 'dark') ? 'dark' : 'light'),
    });
  }, [error]);

  useEffect(() => {
    setFormData(chatSettings || DUMMY_CHAT_SETTINGS);
  }, [chatSettings]);

  const onImageChange = (image: ImageSource) => {
    setFormData({ ...formData, icon: image });
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    if (type === 'number') {
      setFormData({ ...formData, [name]: value ? parseFloat(value) : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Providing feedback or further actions here
    toast.success('Form submitted successfully.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: ((userSettings.theme && userSettings.theme === 'dark') ? 'dark' : 'light'),
    });
  };

  return (
      <div className="w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto pt-3">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="icon">
              {t('icon-header')}
            </label>
            <AvatarFieldEditor readOnly={readOnly} image={formData?.icon ? formData.icon : {data:null, type:'raster'}} onImageChange={onImageChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              {t('name-header')} {readOnly ? '' : '*'}
            </label>
            {readOnly ? <p className="text-gray-700 dark:text-gray-300">{formData.name || "N/A"}</p> :
                <input
                    type="text"
                    id="name"
                    name="name"
                    required={!readOnly}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="description">
              {t('description-header')}
            </label>
            {readOnly ? <p className="text-gray-700 dark:text-gray-300">{formData.description || "N/A"}</p> :
                <textarea
                    id="description"
                    name="description"
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="instructions">
              {t('instructions-header')}
            </label>
            {readOnly ? <p className="text-gray-700 dark:text-gray-300">{formData.instructions || "N/A"}</p> :
                <textarea
                    id="instructions"
                    name="instructions"
                    onChange={handleInputChange}
                    className="resize-y rounded overflow-y-auto h-56 w-full max-h-[60vh] md:max-h-[calc(100vh-300px)] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>}
          </div>
          <div className="mb-4">
            <EditableField<string | null>
                readOnly={readOnly}
                id="model"
                label={t('model-header')}
                value={formData.model}
                defaultValue={null}
                defaultValueLabel={'gpt-4-turbo-preview'}
                editorComponent={(props) =>
                    <ModelSelect value={formData.model}
                                 onModelSelect={props.onValueChange}
                                 models={[]} allowNone={true}
                                 allowNoneLabel="Default"/>}
                onValueChange={(value: string | null) => {
                  setFormData({...formData, model: value});
                }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="seed">
              {t('seed-header')}
            </label>
            {readOnly ? <p className="text-gray-700 dark:text-gray-300">{formData.seed || "N/A"}</p> :
                <input
                    type="number"
                    id="seed"
                    name="seed"
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />}
          </div>
          <EditableField<number | null>
              readOnly={readOnly}
              id="temperature"
              label={t('temperature-header')}
              value={formData.temperature}
              defaultValue={1.0}
              defaultValueLabel="1.0"
              editorComponent={TemperatureSlider}
              onValueChange={(value: number | null) => {
                setFormData({...formData, temperature: value});
              }}
          />
          <EditableField<number | null>
              readOnly={readOnly}
              id="top_p"
              label={t('top-p-header')}
              value={formData.top_p}
              defaultValue={1.0}
              defaultValueLabel="1.0"
              editorComponent={TopPSlider}
              onValueChange={(value: number | null) => {
                setFormData({...formData, top_p: value});
              }}
          />
        </form>
      </div>
  );
};

export default ChatSettingsForm;
