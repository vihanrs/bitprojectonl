package com.bitprojectonl.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // applied as an entity class
@Table(name = "item") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // generate all args constructor
public class Item {
    @Id //for primary key -PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto generated id - AI
    @Column(name = "id", unique = true) // for map with column
    private Integer id;

    @Column(name = "itemcode", unique = true)
    @NotNull
    @Length(max = 10)
    private String itemcode;

    @Column(name = "itemname")
    @NotNull
    private String itemname;

    @Column(name = "itemsize")
    @NotNull
    private BigDecimal itemsize;

    @Column(name = "rop")
    private Integer rop;

    @Column(name = "roq")
    private Integer roq;

    @Column(name = "note")
    private String note;

    @Column(name = "salesprice")
    @NotNull
    private BigDecimal salesprice;

    @Column(name = "purchaseprice")
    @NotNull
    private BigDecimal purchaseprice;

    @Column(name = "addeddatetime")
    @NotNull
    private LocalDateTime addedDateTime;

    @Column(name = "lastmodifydatetime")
    private LocalDateTime lastmodifydatetime;

    @Column(name = "deletedatetime")
    private LocalDateTime deletedatetime;

    @ManyToOne (optional = false)//relationship format
    @JoinColumn (name = "brand_id", referencedColumnName = "id") // join column condition
    private Brand brand_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "subcategory_id", referencedColumnName = "id") 
    private SubCategory subcategory_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "unittype_id", referencedColumnName = "id") 
    private UnitType unittype_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "itemstatus_id", referencedColumnName = "id") 
    private ItemStatus itemstatus_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "packagetype_id", referencedColumnName = "id") 
    private PackageType packagetype_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "added_user_id", referencedColumnName = "id") 
    private User added_user_id;

    @ManyToOne(optional = true)
    @JoinColumn(name = "update_user_id", referencedColumnName = "id") 
    private User update_user_id;

    @Column(name = "delete_user")
    private Integer delete_user;

    public Item(Integer id,String itemcode,String itemname,BigDecimal salesprice,BigDecimal purchaseprice,ItemStatus itemstatus_id,User added_user_id,Integer delete_user){
        this.id = id;
        this.itemcode = itemcode;
        this.itemname = itemname;
        this.salesprice = salesprice;
        this.purchaseprice = purchaseprice;
        this.itemstatus_id = itemstatus_id;
        this.added_user_id = added_user_id;
        this.delete_user = delete_user;
    }
}
