class Vector2 {
    constructor(x=0,y=0) {
        this.x = x;
        this.y = y;
    }

    set(x,y){
        this.x = x;
        this.y = x;
        return this;
    }
    copy(array){
        this.x = array[0];
        this.y = array[1];
        return this;
    }
    clone(){
        return new Vector2(this.x,this.y);
    }
    add(vec){
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }
    sub(vec){
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }
    multiplyScalar(k){
        this.x *= k;
        this.y *= k;
        return this;
    }
    negate(){
        this.x *= -1;
        this.y *= -1;
        return this;
    }
    length(){
        const {x,y} = this;
        return Math.sqrt(x**2 + y**2);
    }
    normalize(){
        return this.multiplyScalar(1/this.length());
    }
    dot(vec){
        return this.x*vec.x + this.y*vec.x;
    }
    cross(vec){
        return this.x*vec.y - this.y*vec.x;
    }
    normal(){
        const y = this.y;
        this.y = -this.x;
        this.x = y;
        return this.normalize();
    }
}