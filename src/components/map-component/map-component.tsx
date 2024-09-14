import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import OSM from 'ol/source/OSM';
import { useEffect, useRef, useState } from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import { Extent, boundingExtent } from 'ol/extent';
import 'ol/ol.css';
import { cn } from '../../lib/utils';
import PopapModal from '../popapModal';

const defaultData = {
    coordinates: [
        {
            latitude: 25.543009,
            longitude: 58.674264,
            status: true,
            details: 'Great service, very satisfied!',
        },
        {
            latitude: 24.603167,
            longitude: 58.898495,
            status: false,
            details: 'Service was delayed, not happy.',
        },
        {
            latitude: 24.16843,
            longitude: 59.310752,
            status: true,
            details: 'Excellent experience, will use again.',
        },
        {
            latitude: 24.450599,
            longitude: 58.713636,
            status: true,
            details: 'Friendly staff, quick response.',
        },
        {
            latitude: 24.371046,
            longitude: 59.301575,
            status: false,
            details: 'Had issues with the service, needs improvement.',
        },
        {
            latitude: 24.141558,
            longitude: 58.620945,
            status: true,
            details: 'Very professional and timely.',
        },
        {
            latitude: 25.833778,
            longitude: 58.716681,
            status: false,
            details: 'Not satisfied, would not recommend.',
        },
        {
            latitude: 26.731192,
            longitude: 59.325441,
            status: true,
            details: 'Fantastic job, very pleased!',
        },
        {
            latitude: 25.780517,
            longitude: 59.089217,
            status: false,
            details: 'Communication was poor, not impressed.',
        },
        {
            latitude: 25.746746,
            longitude: 59.173674,
            status: true,
            details: 'Service was efficient and effective.',
        },
        {
            latitude: 25.034276,
            longitude: 59.013401,
            status: true,
            details: 'Very helpful, great customer service.',
        },
        {
            latitude: 26.470379,
            longitude: 58.552247,
            status: false,
            details: 'Had to wait too long, not happy.',
        },
        {
            latitude: 25.930247,
            longitude: 58.570008,
            status: true,
            details: 'Prompt and courteous service.',
        },
        {
            latitude: 25.365225,
            longitude: 58.987725,
            status: false,
            details: 'Service was below expectations.',
        },
        {
            latitude: 24.935202,
            longitude: 59.115927,
            status: true,
            details: 'Very satisfied with the quick turnaround.',
        },
        {
            latitude: 26.430256,
            longitude: 58.735546,
            status: true,
            details: 'Good experience, would recommend.',
        },
        {
            latitude: 25.904312,
            longitude: 59.114292,
            status: false,
            details: 'Issues with service quality, not satisfied.',
        },
        {
            latitude: 25.792348,
            longitude: 59.096543,
            status: true,
            details: 'Service was excellent, very professional.',
        },
        {
            latitude: 24.518023,
            longitude: 58.513342,
            status: false,
            details: 'Not what I expected, needs improvement.',
        },
        {
            latitude: 25.278237,
            longitude: 58.477057,
            status: true,
            details: 'Great job, very efficient.',
        },
        {
            latitude: 25.97559,
            longitude: 58.890219,
            status: true,
            details: 'Very responsive, good service.',
        },
        {
            latitude: 24.90384,
            longitude: 59.293623,
            status: false,
            details: 'Service was disappointing, not recommended.',
        },
        {
            latitude: 26.571781,
            longitude: 59.133753,
            status: true,
            details: 'Quick and efficient, very pleased.',
        },
        {
            latitude: 26.825068,
            longitude: 58.743903,
            status: false,
            details: 'Service took too long, not happy.',
        },
        {
            latitude: 26.577091,
            longitude: 59.25373,
            status: true,
            details: 'Very professional and reliable.',
        },
        {
            latitude: 25.369384,
            longitude: 59.093461,
            status: true,
            details: 'Friendly and efficient service.',
        },
        {
            latitude: 26.314301,
            longitude: 58.994217,
            status: false,
            details: 'Service was not up to the mark.',
        },
        {
            latitude: 25.797374,
            longitude: 58.537458,
            status: true,
            details: 'Satisfied with the service provided.',
        },
        {
            latitude: 25.60091,
            longitude: 58.680638,
            status: false,
            details: 'Communication was lacking, not happy.',
        },
        {
            latitude: 26.375976,
            longitude: 59.199492,
            status: true,
            details: 'Excellent customer service, very happy.',
        },
        {
            latitude: 25.93279,
            longitude: 58.54432,
            status: true,
            details: 'Service exceeded expectations.',
        },
        {
            latitude: 26.471267,
            longitude: 58.863546,
            status: false,
            details: 'Disappointed with the service, would not recommend.',
        },
        {
            latitude: 25.783936,
            longitude: 59.010458,
            status: true,
            details: 'Very efficient and prompt service.',
        },
        {
            latitude: 26.563927,
            longitude: 58.944737,
            status: false,
            details: 'Service quality was poor, not satisfied.',
        },
        {
            latitude: 24.420313,
            longitude: 58.95752,
            status: true,
            details: 'Service was good, met expectations.',
        },
        {
            latitude: 26.250209,
            longitude: 59.092931,
            status: false,
            details: 'Not happy with the service provided.',
        },
        {
            latitude: 24.880904,
            longitude: 58.618664,
            status: true,
            details: 'Very satisfied with the overall experience.',
        },
        {
            latitude: 24.071776,
            longitude: 59.029391,
            status: true,
            details: 'Great customer service, very pleased.',
        },
        {
            latitude: 26.660852,
            longitude: 58.616018,
            status: false,
            details: 'Had issues with the timing of service.',
        },
        {
            latitude: 24.658983,
            longitude: 58.775929,
            status: true,
            details: 'Service was prompt and efficient.',
        },
        {
            latitude: 26.039513,
            longitude: 58.671455,
            status: false,
            details: 'Service quality could be improved.',
        },
        {
            latitude: 24.573154,
            longitude: 58.976613,
            status: true,
            details: 'Very happy with the service provided.',
        },
        {
            latitude: 24.362336,
            longitude: 58.956102,
            status: false,
            details: 'Not satisfied with the overall experience.',
        },
        {
            latitude: 24.106042,
            longitude: 59.331453,
            status: true,
            details: 'Service was excellent, will use again.',
        },
        {
            latitude: 26.792589,
            longitude: 58.434062,
            status: false,
            details: 'Service did not meet expectations.',
        },
        {
            latitude: 24.086809,
            longitude: 58.428617,
            status: true,
            details: 'Good service, friendly staff.',
        },
        {
            latitude: 25.599046,
            longitude: 58.679712,
            status: true,
            details: 'Great service, very professional.',
        },
        {
            latitude: 24.254756,
            longitude: 59.239888,
            status: false,
            details: 'Service was below expectations.',
        },
    ],
};

function getInitialData() {
    const savedData = localStorage.getItem('mapData');
    return savedData ? JSON.parse(savedData) : defaultData;
}

function saveDataToLocalStorage(data: typeof defaultData) {
    localStorage.setItem('mapData', JSON.stringify(data));
}

function MapComponent() {
    const [mapData, setMapData] = useState(getInitialData());
    const [popupContent, setPopupContent] = useState({
        details: '',
        status: false,
        index: null as number | null,
    });
    const [popupOpen, setPopupOpen] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map | null>(null);

    useEffect(() => {
        const osmLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        });

        const vectorSource = new VectorSource();
        let extent: Extent | null = null;

        mapData.coordinates.forEach((point: any, index: number) => {
            const feature = new Feature({
                geometry: new Point(
                    fromLonLat([point.longitude, point.latitude])
                ),
                status: point.status,
                details: point.details,
                index,
            });

            feature.setStyle(
                new Style({
                    image: new Icon({
                        color: point.status ? 'green' : 'red',
                        crossOrigin: 'anonymous',
                        src: 'https://openlayers.org/en/v6.5.0/examples/data/dot.png',
                        scale: 1.3,
                    }),
                })
            );

            vectorSource.addFeature(feature);

            const geometry = feature.getGeometry();
            if (geometry) {
                const pointExtent = geometry.getExtent();
                extent = extent
                    ? boundingExtent([extent, pointExtent])
                    : pointExtent;
            }
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });

        const map = new Map({
            target: 'map',
            layers: [osmLayer, vectorLayer],
            view: new View({
                center: fromLonLat([58.674264, 25.543009]),
                zoom: 6,
            }),
        });

        if (extent) {
            map.getView().adjustZoom(2);
        }

        const popupOverlay = new Overlay({
            element: popupRef.current!,
            positioning: 'bottom-center',
            stopEvent: true,
        });
        map.addOverlay(popupOverlay);

        map.on('singleclick', (evt) => {
            const feature = map.forEachFeatureAtPixel(
                evt.pixel,
                (feature) => feature
            );
            if (feature) {
                const coords = (
                    feature.getGeometry() as Point
                ).getCoordinates();
                const details = feature.get('details');
                const status = feature.get('status');
                const index = feature.get('index');

                setPopupContent({ details, status, index });
                setPopupOpen(true);
                popupOverlay.setPosition(coords);
                setIsChanged(false);

                map.getView().animate({
                    center: coords,
                    duration: 500,
                    zoom: 12,
                });
            } else {
                setPopupOpen(false);
                map.getView().animate({ zoom: 8 });
            }
        });

        mapRef.current = map;

        return () => {
            map.setTarget(undefined);
        };
    }, [mapData]);

    const handleStatusChange = () => {
        setPopupContent((prevPopupContent) => ({
            ...prevPopupContent,
            status: !prevPopupContent.status,
        }));
        setIsChanged(true);
    };

    const handleDetailsChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setPopupContent((prevPopupContent) => ({
            ...prevPopupContent,
            details: event.target.value,
        }));
        setIsChanged(true);
    };

    const handleSave = () => {
        setMapData((prevData: any) => {
            const newData = { ...prevData };
            const { index } = popupContent;

            if (index !== null) {
                newData.coordinates[index].status = popupContent.status;
                newData.coordinates[index].details = popupContent.details;
            }

            saveDataToLocalStorage(newData);
            setIsChanged(false);
            return newData;
        });
    };

    return (
        <div className="relative h-screen w-full">
            <div id="map" className="absolute inset-0 h-full w-full" />
            <div
                ref={popupRef}
                className={cn(
                    `absolute rounded-xl xl:w-[400px] w-[350px] bg-white p-4 shadow-lg border border-gray-200 
               transition-transform transform-gpu duration-200 ease-in-out 
               ${popupOpen ? 'block' : 'hidden'}
                z-20 xl:w-[400px] w-[300px] bg-white p-4 -translate-x-1/2 translate-y-3 shadow-lg border border-gray-200 rounded-xl
               `
                )}
            >
                {popupOpen && (
                    <PopapModal
                        details={popupContent.details}
                        status={popupContent.status}
                        isChanged={isChanged}
                        handleStatusChange={handleStatusChange}
                        handleDetailsChange={handleDetailsChange}
                        handleSave={handleSave}
                    />
                )}
            </div>
        </div>
    );
}

export default MapComponent;
