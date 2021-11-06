/**----------------------------------登录页背景图片混入-----------------------------------------------*/
export default {
  data() {
    return {
      starForm: {
        minW: 2, //大小
        maxW: 5, //大小
        minH: 2, //大小
        maxH: 5, //大小
        zongZ: -500, //中心点位置
        starCount: 400, //星星数
        starList: [],
        minDistance: 500,
        maxDistance: 1000,
        minDeg: -55,
        maxDeg: 55,
        timer: null,
        count: 360000,
        options: [],
      },
    };
  },
  computed: {
    getStar() {
      return;
    },
  },
  methods: {
    //
    handleClick1() {
      console.log(11);
      this.starForm.starList[0].style.transform = `rotateY(${this.starForm.options[0].randomY}deg) rotateX(${this.starForm.options[0].randomX}deg) rotateZ(${this.starForm.options[0].randomZ}deg) translateZ(${this.starForm.options[0].randomZ}px) rotateX(${this.starForm.options[0].randomX + this.starForm.count}deg) rotateY(${this.starForm.options[0].randomY + this.starForm.count}deg)`;
    },
    //init(初始化)
    setTransform() {
      // this.timer = setInterval(() => {
      //   this.starForm.count += 2;
      // }, 30);
      this.starForm.starList.forEach((element, index) => {
        console.log(11);
        // rotateX(8deg) rotateZ(29deg) rotateY(-268deg)
        // element.style.transformOrigin = `50% 50% ${this.starForm.zongZ}px`;
        let obj = {};
        obj.randomY = Math.random() * (360 * 4 - 0 + 1) + 0; //360随机数
        obj.randomZ = Math.random() * (this.starForm.maxDistance - this.starForm.minDistance + 1) + this.starForm.minDistance; //距离中心点随机数
        obj.randomX = Math.random() * (this.starForm.maxDeg - this.starForm.minDeg + 1) + this.starForm.minDeg; //扩散范围随机数
        obj.randomW = Math.random() * (this.starForm.maxW - this.starForm.minW + 1) + this.starForm.minW; //w随机数
        obj.randomH = Math.random() * (this.starForm.maxH - this.starForm.minH + 1) + this.starForm.minH; //h随机数
        element.style.transform = ` rotateY(${obj.randomY}deg) rotateX(${obj.randomX}deg) rotateZ(${obj.randomZ}deg) translateZ(${obj.randomZ}px) rotateX(${obj.randomX}deg) rotateY(${obj.randomY}deg)`;
        element.style.width = `${obj.randomW}px`;
        element.style.height = `${obj.randomH}px`;

        this.starForm.options.push(obj);
      });
      // this.handleClick.call(this); //初始化
    },
    handleClick() {
      this.starForm.starList.forEach((element, index) => {
        element.style.transform = ` rotateY(${this.starForm.options[index].randomY}deg) rotateX(${this.starForm.options[index].randomX}deg) rotateZ(${this.starForm.options[index].randomZ}deg) translateZ(${this.starForm.options[index].randomZ}px) rotateX(${this.starForm.options[index].randomX + this.starForm.count}deg) rotateY(${this.starForm.options[index].randomY + this.starForm.count}deg) rotateZ(${this.starForm.options[index].randomZ + this.starForm.count}deg)`;
      });
    },
  },
  mounted() {
    this.starForm.starList = document.querySelectorAll('.star_item');
    this.setTransform(); //设置位置
  },
  watch: {
    'starForm.count'(value) {
      console.log(value, 'value');
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};

/**----------------------------------登录页背景图片混入-----------------------------------------------*/
