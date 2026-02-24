"use client";

import { useEffect, useState } from "react";
// Components
import ArtistSearch from "../../components/ArtistSearch/ArtistSearch";
import ArtistTitle from "../../components/ArtistTitle/ArtistTitle";
import ArtistsList from "../../components/ArtistsList/ArtistsList";
import Looking from "../../components/Looking/Looking";
import SoundWaves from "../../components/SoundWaves/SoundWaves";
// Utils
import type { ICheckbox } from "../../types/types";
import {
  ARTISTS_LIST,
  GENRE,
  genresOption,
  // LOCATIONS,
} from "../../utils/constants";
// Styles
import useApiHook from "../../hooks/useApiHook";
import styles from "./artist.module.css";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Filter from "../../components/Filter/Filter";
import artistSearchStyles from "../../components/ArtistSearch/artistsearch.module.css";

// const initialLocations: ICheckbox[] = LOCATIONS.map((loc) => ({
//   name: loc,
//   checked: false,
// }));

const initialGenre: ICheckbox[] = genresOption.map((genre) => ({
  name: genre?.label,
  value: genre?.value,
  checked: false,
}));

export default function Artist({
  initialArtists = [],
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialArtists?: any[];
}) {
  const [searchArtist, setSearchArtist] = useState<string>("");
  const [artist, setArtist] = useState(initialArtists || []);
  const [filteredArtist, setfFilteredAArtist] = useState<
    {
      id: number;
      photo: string | any;
      name: string;
      genre: string;
      variants: string[];
    }[]
  >(ARTISTS_LIST);
  const [formData, setFormData] = useState<{
    location: ICheckbox[];
    budget: { from: string; to: string };
    genre: ICheckbox[];
  }>({
    location: [],
    budget: { from: "", to: "" },
    genre: initialGenre,
  });
  const [genreTag, setGenreTag] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const querySearchedArtist = searchParams?.get("search");
  const queryLocation = searchParams?.get("location");
  const queryMinRate = searchParams?.get("average_booking_rate_min");
  const queryMaxRate = searchParams?.get("average_booking_rate_max");
  const [locations, setLocations] = useState<string[]>([]);
  const [isLocationsLoaded, setIsLocationsLoaded] = useState(false);

  const { api } = useApiHook();

  const handleArtistSearchByName = (value: string): void => {
    setSearchArtist(value);
  };

  const handleFilterChange = (value: ICheckbox[] | string, name: string) => {
    setFormData((prev) => {
      if (name === "genre" || name === "location") {
        return { ...prev, [name]: value as ICheckbox[] };
      }
      if (name === "budget.from" || name === "budget.to") {
        const key = name.split(".")[1] as "from" | "to";
        return {
          ...prev,
          budget: {
            ...prev.budget,
            [key]: value as string,
          },
        };
      }
      return prev;
    });
  };

  const handleClearData = () => {
    setFormData({
      location: [],
      budget: { from: "", to: "" },
      genre: initialGenre,
    });

    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.delete("search");
    newParams.delete("location");
    newParams.delete("average_booking_rate_min");
    newParams.delete("average_booking_rate_max");

    router.push(`${pathname}?${newParams.toString()}`);

    setIsLocationsLoaded(() => false);
  };

  useEffect(() => {
    const filtered = ARTISTS_LIST.filter((artist) =>
      artist.name.toLowerCase().includes(searchArtist.toLowerCase()),
    );

    setfFilteredAArtist(filtered);
  }, [searchArtist]);

  const fetchLocations = async () => {
    try {
      const { success, error, data } = await api({
        method: "GET",
        endPoint: `/admin/artists-locations/`,
        needLoader: true,
        loaderName: "artists-locations",
        showErrorToast: false,
      });

      const filteredLocations = data?.filter(
        (c: string) => c != null && c !== "undefined",
      );

      if (success) {
        setLocations(filteredLocations);
      }
    } catch (err) {
      console.error("Error generating support ticket:", err);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchLocations();

    setFormData((prev) => ({
      ...prev,
      budget: {
        from: queryMinRate || "",
        to: queryMaxRate || "",
      },
      // location: locations?.map((loc) => ({
      //   name: loc,
      //   checked: queryLocation ? queryLocation.split(",").includes(loc) : false,
      // })),
    }));

    setSearchArtist(querySearchedArtist || "");
  }, []);

  useEffect(() => {
    if (!isLocationsLoaded && locations.length > 0) {
      // Initialize location checkboxes only after locations are loaded
      const initialLocations = locations.map((loc) => ({
        name: loc,
        checked: queryLocation ? queryLocation.split(",").includes(loc) : false,
      }));

      console.log("initialLocations", initialLocations);

      setFormData((prev) => ({
        ...prev,
        location: initialLocations,
      }));

      setIsLocationsLoaded(true); // Mark as loaded to prevent re-initialization
    }
  }, [locations, queryLocation, isLocationsLoaded]);

  const getArtist = async () => {
    console.log("getting artist lists");
    const response = await api({
      endPoint: "/customer/artists-list/",
      method: "GET",
      params: {
        location: (() => {
          const checkedLocations =
            formData?.location?.filter((item) => item.checked) || [];
          return checkedLocations.length > 0
            ? checkedLocations.map((item) => item.name)
            : queryLocation?.split(",");
        })(),
        genre: formData?.genre
          ?.filter(({ checked }) => checked)
          ?.map?.(({ value }) => value),
        search: searchArtist || undefined,
        average_booking_rate_min:
          formData?.budget?.from || queryMinRate || undefined,
        average_booking_rate_max:
          formData?.budget?.to || queryMaxRate || undefined,
        tag: genreTag || undefined,
      },
    });
    if (response?.success) {
      setArtist(response?.data);
    }
    console.log("resoponse", response);
  };

  useEffect(() => {
    if (initialArtists && initialArtists.length > 0) {
      setArtist(initialArtists);
    }
  }, [initialArtists]);

  useEffect(() => {
    // Only fetch initially if we don't have SSR data
    // Also, if search params exist, we might want to refetch to filter on the client side
    // or rely on server side filtering if we implemented it there (but we haven't yet for params).
    // For now, let's keep it simple: if initialArtists is empty, fetch.
    if (!initialArtists || initialArtists.length === 0) {
      const timeId = setTimeout(() => {
        getArtist();
      }, 1000);
      return () => clearTimeout(timeId);
    }
  }, []);

  useEffect(() => {
    // Skip the first render if we have initial data and no filters changed yet
    // This logic might need refinement depending on exact behavior desired
    const isInitialRender =
      initialArtists.length > 0 &&
      !searchArtist &&
      !genreTag &&
      !formData.budget.from &&
      !formData.budget.to &&
      formData.genre === initialGenre &&
      formData.location.length === 0;

    if (isInitialRender) return;

    const timeId = setTimeout(() => {
      getArtist();
    }, 1000);
    return () => clearTimeout(timeId);
  }, [
    searchArtist,
    genreTag,
    formData.budget,
    formData.genre,
    formData.location,
  ]);

  const handleSubmit = () => {
    getArtist();
  };

  return (
    <section className={styles.section}>
      <ArtistTitle />
      <div className={artistSearchStyles.container}>
        <ArtistSearch
          search={handleArtistSearchByName}
          value={searchArtist}
          formData={formData}
          handleFilterChange={handleFilterChange}
          optionsLocation={locations}
          optionsGenre={GENRE}
          clear={handleClearData}
          submit={handleSubmit}
        />
        <Filter
          formData={formData}
          handleFilterChange={handleFilterChange}
          optionsLocation={locations}
          optionsGenre={GENRE}
          clear={handleClearData}
          submit={handleSubmit}
        />
      </div>
      <ArtistsList
        artistList={filteredArtist || []}
        artist={artist || []}
        onGenreClick={setGenreTag}
      />
      <SoundWaves />
      <Looking />
    </section>
  );
}
