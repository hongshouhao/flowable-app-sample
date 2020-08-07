import {
  appId,
  IP
} from "./app";
export const services = {
  sys: {
    query: `http://${IP}/onemapsrv/getBQueryResult?appid=SysData&Dappid=${appId}&name=getUser&id=`,
    gridCols: `http://${IP}/onemapsrv/gridcols?appid=sysData&gridname=`,
    gridData: `http://${IP}/onemapsrv/gridData?appid=sysData&gridname=`,
    login: `http://${IP}/onemapsrv/login?appid=${appId}`,
    changePsd: `http://${IP}/onemapsrv/ChangePwd?appid=${appId}`,
    GetFQuerylist: `http://${IP}/onemapsrv/GetFQuerylist?appid=${appId}`
  },
  admin: {
    query: `http://${IP}/onemapsrv/getBQueryResult?appid=SysData&name=`,
    execute: `http://${IP}/onemapsrv/execute?appid=SysData&Servicename=`,
  },
  modules: {
    mapView: `http://${IP}/onemapsrv/mapview?appid=${appId}&xusername=`,
    mapLayer: `http://${IP}/onemapsrv/layermanager?appid=${appId}&xusername=`,
    mapSearch: `http://${IP}/onemapsrv/quickQueryList?appid=${appId}&xusername=`,
    menu: `http://${IP}/onemapsrv/menu?appid=${appId}&username=`,
    mapSwipe: `http://${IP}/onemapsrv/comparelayer?appid=${appId}&xUserName=`,
    mapCmpare: `http://${IP}/onemapsrv/comparelayer?appid=${appId}&xUserName=`,
    toolsBar: `http://${IP}/onemapsrv/maptool?appid=${appId}&xUserName=`
  },
  layer: {
    iQuery: `http://${IP}/onemapsrv/iQuery?appid=${appId}`,
    favourite: `http://${IP}/onemapsrv/favlayer/${appId}/`,
    query: `http://${IP}/onemapsrv/iQuery?appid=${appId}&ServiceName=iQueryServiceKey&xUserName=`,
    queryById: `http://${IP}/onemapsrv/layerInfo/${appId}/`,
    queryGroupByName: `http://${IP}/onemapsrv/layergroup?appid=${appId}`,
    log: `http://${IP}/onemapsrv/Log/OpenMapLayer?appid=${appId}`,
    detail: `http://${IP}/onemapsrv/srv/maplayer/detail`,
    meta: `http://${IP}/onemapsrv/layerjson`
  },
  grid: {
    cols: `http://${IP}/onemapsrv/gridcols?appid=${appId}&gridname=`,
    data: `http://${IP}/onemapsrv/gridData?appid=${appId}&gridname=`,
  },
  do: {
    execute: `http://${IP}/onemapsrv/execute?appid=${appId}&Servicename=`,
    executep: `http://${IP}/onemapsrv/executep?appid=${appId}&Servicename=`,
    query: `http://${IP}/onemapsrv/getBQueryResult?appid=${appId}&name=`,
    stats: `http://${IP}/onemapsrv/GetStatsResult?appid=${appId}&name=`,
    queryMoreInfo: `http://${IP}/onemapsrv/iQueryDetail?appid=${appId}`,
    geojson: `http://${IP}/onemapsrv/GetBQueryGeoJson?appid=${appId}&name=`,
    edit: `http://${IP}/onemapsrv/BExecute?appid=${appId}&Servicename=`
  },
  file: {
    upload: `http://${IP}/onemapsrv/UploadFiles?appid=${appId}`,
    dir: `http://${IP}/onemapsrv/Ext/DirAndFile`,
    view: `http://${IP}/onemapsrv/DownloadFile?appid=${appId}`,
    infos: `http://${IP}/onemapsrv/DownloadFilesInfo?appid=${appId}`,
    vector_export: `http://${IP}/onemapsrv/GetBQueryExport?appid=${appId}&Servicename=`,
    vector_import: `http://${IP}/onemapsrv/ResolveGisFile?appid=${appId}`,
  },
};