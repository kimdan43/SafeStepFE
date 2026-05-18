import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const DEFAULT_LAT = 37.3375;
const DEFAULT_LNG = 127.264;

const MapSection = ({ zones = [], lat = DEFAULT_LAT, lng = DEFAULT_LNG }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  // 지도 초기화 — lat/lng 변경 시에만
  useEffect(() => {
    if (!window.kakao || !containerRef.current) return;

    const center = new window.kakao.maps.LatLng(lat, lng);
    const map = new window.kakao.maps.Map(containerRef.current, {
      center,
      level: 4,
    });
    mapRef.current = map;

    new window.kakao.maps.Marker({ position: center }).setMap(map);
  }, [lat, lng]);

  // 위험구간 오버레이 — zones 변경 시
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.kakao) return;

    const center = new window.kakao.maps.LatLng(lat, lng);

    if (zones.length > 0) {
      zones.forEach((zone) => {
        new window.kakao.maps.Circle({
          map,
          center: new window.kakao.maps.LatLng(zone.latitude, zone.longitude),
          radius: zone.radius || 150,
          strokeWeight: 2,
          strokeColor: '#ff0000',
          strokeOpacity: 0.7,
          fillColor: '#ff0000',
          fillOpacity: 0.15,
        });
      });
    } else {
      [[200, 0.06], [150, 0.13], [100, 0.22], [60, 0.4]].forEach(([radius, fillOpacity]) => {
        new window.kakao.maps.Circle({
          map,
          center,
          radius,
          strokeWeight: 1,
          strokeColor: '#ff0000',
          strokeOpacity: fillOpacity * 2,
          fillColor: '#ff0000',
          fillOpacity,
        });
      });
    }
  }, [zones]);

  return <MapContainer ref={containerRef} />;
};

export default MapSection;

const MapContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`;
