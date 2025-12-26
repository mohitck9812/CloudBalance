public class Product {
    // id , name , price
    private Long id;
    private String name;
    private Double price;

    public void setPrice(Double price) {
        if(price < 0) throw new IllegalArgumentException("Negative pricing is not allowed");
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }
}
