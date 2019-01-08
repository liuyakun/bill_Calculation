/**
 * 作者：yeshengqiang
 * 时间：2017-09-21
 * 描述：map
 */
 import AMap from 'AMap';
// import { Message } from 'element-ui';

 export default {
     data () {
         return {
             map: null,
             viewport: null
         };
     },
     methods: {
        _initMap (id, lon, lat) {
            return new Promise((resolve, reject) => {
                try {
                    this.map = new AMap.Map(id, {
                        resizeEnable: true,
                        zoom: 11,
                        center: [lon, lat]
                    });
                    resolve(true);
                } catch (e) {
                    reject('地图初始化失败，请稍后再试!');
                }
            });
        }
     }
 };
