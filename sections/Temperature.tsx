import type { Temperature } from "apps/weather/loaders/temperature.ts";

export interface Props {
    /**
     * @title Temperatura
     */
    temperature?: Temperature | null;
    /**
     * @title Localização
     */
    location?: string;
  }

  const Temperature = ({ temperature, location }: Props) => {

    return (
      <>
        <div class="px-4 mt-2 fixed p-1 rounded-lg bottom-3 left-3 bg-gray-600 text-white shadow-sm">
          <span class="text-lg italic">{location}, {temperature?.celsius}°C</span>
        </div>
      </>
    );
  }
  
  export default Temperature;