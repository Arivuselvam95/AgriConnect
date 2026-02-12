import matplotlib.pyplot as plt

def plot_results(y_true, y_pred, crop):
    plt.figure(figsize=(8,4))
    plt.plot(y_true, label="Actual")
    plt.plot(y_pred, label="Predicted")
    plt.legend()
    plt.title(f"{crop.capitalize()} Price Prediction")
    plt.xlabel("Time")
    plt.ylabel("Price")
    plt.tight_layout()
    plt.savefig(f"reports/figures/{crop}_prediction.png")
    plt.close()