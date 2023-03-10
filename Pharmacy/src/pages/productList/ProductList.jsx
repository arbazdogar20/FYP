import "./productList.css";
import { useState, useEffect, useContext } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { Pic, publicRequest } from '../../requestMethod';
import { Context } from "../../context/Context";

export default function ProductList() {
  const [medicine, setMedicine] = useState([]);
  const {user} = useContext(Context);

  // console.log(user);
  
  useEffect(() => {
    const fetchMedicines = async () => {
      const res = await publicRequest.get(`/medicine?pharmacyname=${user.pharmacyName}&new=true`);
      setMedicine(res.data);
    }
    fetchMedicines();
  }, [medicine]);

  const handleDelete = async(id) => {
    try {
      await publicRequest.delete(`/medicine/${id}`,{
        data:{pharmacyName: user.pharmacyName}
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };


  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "medicineName",
      headerName: "Medicine Name",
      width: 200,
      renderCell: (params) => {
        return (
            <Link to={"/product/" + params.row._id} className="link">
              <div className="productListItem">
                <img className="productListImg" src={Pic+params.row.img} alt="" />
                {params.row.medicineName}
              </div>
            </Link>
        );
      },
    },
    { field: "generic", headerName: "Brand Name", width: 200 },
    { field: "mg_ml", headerName: "Mg_Ml", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "price", headerName: "Price", width: 110 },
    { field: "inStock", headerName: "Stock", width: 110 },
    { field: "action", headerName: "Action", width: 150,
      renderCell: (params) => {
        return (
          <>

            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={medicine}
        disableSelectionOnClick
        columns={columns}
        getRowId={row=>row._id}
        pageSize={99}
        checkboxSelection
      />
    </div>
  );
}
