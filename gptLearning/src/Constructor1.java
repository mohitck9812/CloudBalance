public class Constructor1 {
    int x;
    int y;

    Constructor1(int x,int y){
        this.x = x;
        this.y = y;
    }

}

class Constructor2 extends Constructor1{
    int a;
    int b;

    Constructor2(){
        super(0,0);
         this.a = super.x;
         this.b = super.y;
    }
}
