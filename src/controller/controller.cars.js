const connection = require("../database/conexion");

const allCar = async (req, res) => {
  try {
    const query = await connection.execute('SELECT * FROM car ORDER BY 1 DESC');
    return res.json(query);
  } catch (error) {
    return {
      status: 404,
      send: "error",
      data: error.message,
    };
  }
};

const addCar = async (req, res) => {
  try {
    const { carModelo, carColor, carMatricula, carMarca } = req.body;
    await connection.execute(`INSERT INTO car (carModelo, carColor, carMatricula, carMarca) VALUES ('${carModelo}','${carColor}','${carMatricula}','${carMarca}')`);
    return res.json({
      message: ' tu vehiculo ha sido registrado'
    });
  } catch (error) {
    return {
      status: 404,
      send: "error",
      data: error.message,
    };
  }
};

const updateCar = async (req, res) => {
  try {
    const idcar = req.params.idcar;
    const { carModelo, carColor, carMatricula,carMarca } = req.body;
    await connection.execute(
      'UPDATE car SET carModelo = ?, carColor = ?, carMatricula = ?, carMarca = ? WHERE idcar = ?',
      [carModelo, carColor, carMatricula, carMarca, idcar]
    );

    return res.json({
      message: 'su vehiculo se ha actualizado'
    });
  } catch (error) {
    return {
      status: 404,
      data: error.message
    };
  }
};

const deleteCar = async (req, res) => {
  try {
    const idcar = req.params.idcar;
    await connection.execute(`UPDATE car SET carMatricula = 0 WHERE idcar = '${idcar}'`);
    return res.json({
      message: 'vehiculo eliminado'
    });
  } catch (error) {
    return {
      status: 404,
      data: error.message
    };
  }
};
const consultCar = async (req, res) => {
  try { 
    const idcar = req.params.idcar;
    
     const [result] = await connection.execute(`SELECT * FROM car WHERE idcar = ${idcar}`);
    if (result.length === 0) {
      return res.status(404).json({
        message: 'vehiculo no encontrado'
      });
    }

    const car = result[0];
    return res.json({
      message: 'vehiculo encontrado',
      data: car
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al consultar tu vehiculo',
       data:error.message
    });
  }
};
module.exports = {
    allCar,
    addCar,
    updateCar,
    deleteCar,
    consultCar
};
